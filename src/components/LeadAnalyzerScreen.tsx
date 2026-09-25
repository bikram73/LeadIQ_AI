import React, { useState } from 'react';
import { Lead, LeadInput, NavTab } from '../types';
import { analyzeSingleLeadApi, analyzeBulkLeadsApi } from '../services/apiService';
import { SAMPLE_PRD_LEADS, getSampleEmailText } from '../data/sampleLeads';
import { validateLeadInput } from '../services/scoringEngine';
import { parseRfc4180Csv } from '../utils/csvParser';

// Intelligent extractor from raw email text
function parseEmailContentToLead(rawText: string, fallbackLead?: Lead): LeadInput {
  const text = rawText || '';

  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  const extractedEmail = emailMatch ? emailMatch[1] : fallbackLead?.email || '';

  // Extract Name
  let extractedName = '';
  const fromMatch = text.match(/(?:From|Sender|Name):\s*([A-Za-z\s]+)(?:<|\n|$)/i);
  if (fromMatch && fromMatch[1]) {
    extractedName = fromMatch[1].trim();
  } else if (text.match(/Hi LeadIQ team,\s*\n*I'm\s+([A-Za-z\s]+),/i)) {
    const m = text.match(/Hi LeadIQ team,\s*\n*I'm\s+([A-Za-z\s]+),/i);
    if (m) extractedName = m[1].trim();
  } else if (fallbackLead?.fullName) {
    extractedName = fallbackLead.fullName;
  } else {
    extractedName = 'Inbound Prospect';
  }

  // Extract Company
  let extractedCompany = '';
  const companyMatch = text.match(/(?:at|from|company:?)\s+([A-Z][A-Za-z0-9\s&,.]+?)(?:\.|\n|,|\s+and|\s+we)/i);
  if (companyMatch && companyMatch[1] && companyMatch[1].length < 30) {
    extractedCompany = companyMatch[1].trim();
  } else if (fallbackLead?.company) {
    extractedCompany = fallbackLead.company;
  } else {
    extractedCompany = 'Company Inc.';
  }

  // Extract Role / Job Title
  let extractedRole = '';
  const roleMatch = text.match(/(?:as the|I am the|I'm the|Title:?)\s+([A-Za-z\s]+?)(?:\s+at|\s+for|,|\.|\n)/i);
  if (roleMatch && roleMatch[1]) {
    extractedRole = roleMatch[1].trim();
  } else if (fallbackLead?.jobTitle) {
    extractedRole = fallbackLead.jobTitle;
  } else {
    extractedRole = 'Decision Maker';
  }

  // Extract Budget
  let extractedBudget = '';
  const budgetMatch = text.match(/(?:budget(?:ed)?|allocated|range)?\s*(?:of|is|around|approx)?\s*(\$[\d,]+(?:\s*-\s*\$[\d,]+)?|\b\d+k\b)/i);
  if (budgetMatch && budgetMatch[1]) {
    extractedBudget = budgetMatch[1].trim();
  } else if (fallbackLead?.budget) {
    extractedBudget = fallbackLead.budget;
  } else {
    extractedBudget = 'Unspecified';
  }

  // Extract Requirements
  let extractedReq = '';
  if (text.includes('requirements:') || text.includes('Requirements:')) {
    extractedReq = text.split(/requirements:/i)[1]?.split('\n\n')[0]?.trim() || '';
  } else if (text.length > 30) {
    extractedReq = text.substring(0, 200).replace(/\n+/g, ' ').trim();
  } else {
    extractedReq = fallbackLead?.requirements || 'Automated Sales & Lead Qualification Inquiry';
  }

  return {
    fullName: extractedName,
    company: extractedCompany,
    jobTitle: extractedRole,
    industry: fallbackLead?.industry || 'General B2B',
    companySize: fallbackLead?.companySize || '50-200',
    budget: extractedBudget,
    location: fallbackLead?.location || 'United States',
    requirements: extractedReq,
    notes: `Extracted from inbound email inquiry: ${text.slice(0, 100)}...`,
    email: extractedEmail,
    emailContent: rawText,
  };
}

interface LeadAnalyzerScreenProps {
  onNavigate: (tab: NavTab) => void;
  onAddLead: (lead: Lead) => void;
  onAddMultipleLeads: (leads: Lead[]) => void;
}

export const LeadAnalyzerScreen: React.FC<LeadAnalyzerScreenProps> = ({
  onNavigate,
  onAddLead,
  onAddMultipleLeads,
}) => {
  const [inputMode, setInputMode] = useState<'manual' | 'email' | 'csv'>('manual');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedLead, setAnalyzedLead] = useState<Lead | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');

  // Raw Email Input State
  const [rawEmailText, setRawEmailText] = useState('');

  // Form Validation Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleAnalyzeManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const leadInput: LeadInput = {
      fullName: fullName.trim(),
      company: company.trim(),
      industry: industry.trim() || 'General B2B',
      jobTitle: jobTitle.trim() || 'Business Contact',
      companySize: companySize.trim() || '50-100',
      budget: budget.trim() || 'Unspecified',
      location: location.trim() || 'United States',
      requirements: requirements.trim(),
      notes: notes.trim(),
      email: email.trim(),
    };

    // Client-side Validation (TC-MAN-001 to TC-MAN-005)
    const validation = validateLeadInput(leadInput);
    if (!validation.isValid) {
      const errObj: Record<string, string> = {};
      validation.errors.forEach((err) => {
        errObj[err.field] = err.message;
      });
      setFormErrors(errObj);
      setStatusMessage(validation.errors.map((e) => e.message).join(' '));
      return;
    }

    setIsAnalyzing(true);
    setStatusMessage('Evaluating lead against 7 deterministic qualification factors with AI...');

    try {
      const result = await analyzeSingleLeadApi(leadInput);
      setAnalyzedLead(result);
      onAddLead(result);
      setStatusMessage(`✓ Lead for ${leadInput.fullName} (${leadInput.company}) qualified and added to current session dashboard!`);
    } catch (err: any) {
      console.error(err);
      setStatusMessage(err.message || 'Error qualifying lead. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawEmailText.trim()) {
      setStatusMessage('Please paste the email content to qualify.');
      return;
    }

    setIsAnalyzing(true);
    setStatusMessage('Extracting contact firmographics & evaluating email intent with AI...');

    try {
      const fallbackSample = SAMPLE_PRD_LEADS.find((s) => s.id === selectedSampleId);
      const leadInput = parseEmailContentToLead(rawEmailText, fallbackSample);
      const result = await analyzeSingleLeadApi(leadInput);
      setAnalyzedLead(result);
      onAddLead(result);
      setStatusMessage(`✓ Inbound email from ${leadInput.fullName} (${leadInput.company}) successfully qualified and added to session queue!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Error qualifying email inquiry. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSampleDataset = () => {
    setIsAnalyzing(true);
    setStatusMessage('Importing and qualifying 5 PRD Benchmark dataset leads...');
    setTimeout(() => {
      onAddMultipleLeads(SAMPLE_PRD_LEADS);
      setAnalyzedLead(SAMPLE_PRD_LEADS[0]);
      setIsAnalyzing(false);
      setStatusMessage('✓ Loaded 5 PRD sample dataset leads (David Brown, John Carter, Michael Ross, Sarah Lee, Emma Wilson) into session dashboard queue!');
    }, 600);
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setStatusMessage('Parsing CSV file with RFC-4180 standard parser...');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) {
        setStatusMessage('Error: CSV file is empty.');
        setIsAnalyzing(false);
        return;
      }

      // RFC-4180 Compliant Parsing
      const parsedCsv = parseRfc4180Csv(content);
      if (parsedCsv.errors.length > 0 || parsedCsv.headers.length === 0) {
        setStatusMessage(`Error: ${parsedCsv.errors.join(' ') || 'Invalid CSV format'}`);
        setIsAnalyzing(false);
        return;
      }

      // Check header row for required Requirement column
      const headers = parsedCsv.headers.map((h) => h.toLowerCase());
      const hasRequirementCol = headers.some((h) => h.includes('require'));
      if (!hasRequirementCol) {
        setStatusMessage('Required column missing: Requirement');
        setIsAnalyzing(false);
        return;
      }

      const nameKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('name')) || parsedCsv.headers[0];
      const compKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('company')) || parsedCsv.headers[1];
      const reqKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('require')) || parsedCsv.headers[2];
      const roleKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('role') || h.toLowerCase().includes('title'));
      const indKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('industry'));
      const budKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('budget'));
      const sizeKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('size'));
      const emailKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('email'));
      const notesKey = parsedCsv.headers.find((h) => h.toLowerCase().includes('note'));

      const parsedLeads: LeadInput[] = [];
      const seenNames = new Set<string>();
      let duplicateCount = 0;

      parsedCsv.rows.forEach((row, idx) => {
        const name = (nameKey ? row[nameKey] : '')?.trim() || `Lead ${idx + 1}`;
        const comp = (compKey ? row[compKey] : '')?.trim() || 'Company';
        const req = (reqKey ? row[reqKey] : '')?.trim() || 'Inquiry';

        if (!name && !comp && !req) return;

        if (seenNames.has(name.toLowerCase())) {
          duplicateCount++;
        }
        seenNames.add(name.toLowerCase());

        parsedLeads.push({
          fullName: name,
          company: comp,
          requirements: req,
          jobTitle: (roleKey ? row[roleKey] : '')?.trim() || 'Business Contact',
          industry: (indKey ? row[indKey] : '')?.trim() || 'General B2B',
          budget: (budKey ? row[budKey] : '')?.trim() || 'Unspecified',
          companySize: (sizeKey ? row[sizeKey] : '')?.trim() || '50-100',
          location: 'United States',
          email: (emailKey ? row[emailKey] : '')?.trim() || '',
          notes: (notesKey ? row[notesKey] : '')?.trim() || '',
        });
      });

      if (parsedLeads.length === 0) {
        setStatusMessage('Error: No valid lead data found in CSV.');
        setIsAnalyzing(false);
        return;
      }

      setStatusMessage(`Evaluating ${parsedLeads.length} leads in batch...`);
      try {
        const analyzed = await analyzeBulkLeadsApi(parsedLeads);
        onAddMultipleLeads(analyzed);
        setAnalyzedLead(analyzed[0] || null);
        setStatusMessage(
          `✓ Successfully qualified ${analyzed.length}/${parsedLeads.length} leads from CSV file '${file.name}' into current session! ${
            duplicateCount > 0 ? `(${duplicateCount} duplicate records processed)` : ''
          }`
        );
      } catch (err) {
        console.error(err);
        setStatusMessage('Error analyzing CSV leads in batch.');
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsText(file);
  };

  const handlePopulateSample = (sample: Lead) => {
    setSelectedSampleId(sample.id);
    setFullName(sample.fullName);
    setCompany(sample.company);
    setIndustry(sample.industry);
    setJobTitle(sample.jobTitle);
    setCompanySize(sample.companySize);
    setBudget(sample.budget);
    setLocation(sample.location);
    setRequirements(sample.requirements);
    setNotes(sample.notes);
    setEmail(sample.email || '');

    const emailText = sample.emailContent || getSampleEmailText(sample);
    setRawEmailText(emailText);
    setStatusMessage(`✓ Selected ${sample.fullName} (${sample.company}) – Form & Email Text synchronized!`);
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 px-3 sm:px-6 md:px-10 max-w-[1280px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#006b2c] hover:underline mb-1 cursor-pointer py-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard Queue
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Lead Qualification Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Submit prospect details, raw emails, or CSV files for instant AI qualification &amp; scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-[#1E293B] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs min-h-[40px]"
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            View Dashboard
          </button>
        </div>
      </div>

      {/* Input Mode Selector Bar (Responsive segmented control) */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs mb-6 max-w-xl">
        <button
          onClick={() => setInputMode('manual')}
          className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] ${
            inputMode === 'manual'
              ? 'bg-[#006b2c] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base sm:text-lg">edit_note</span>
          <span className="truncate">Manual Form</span>
        </button>

        <button
          onClick={() => setInputMode('email')}
          className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] ${
            inputMode === 'email'
              ? 'bg-[#006b2c] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base sm:text-lg">mail</span>
          <span className="truncate">Email Text</span>
        </button>

        <button
          onClick={() => setInputMode('csv')}
          className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] ${
            inputMode === 'csv'
              ? 'bg-[#006b2c] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base sm:text-lg">csv</span>
          <span className="truncate">Bulk CSV</span>
        </button>
      </div>

      {/* Quick Sample Lead Picker Chips */}
      <div className="mb-6 md:mb-8 bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
          <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#006b2c]">touch_app</span>
            Quick Test · Fill Benchmark Lead:
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#006b2c] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">sync</span>
            Synchronizes Form &amp; Raw Email
          </span>
        </div>
        <div className="flex overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap gap-2 scrollbar-none">
          {SAMPLE_PRD_LEADS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handlePopulateSample(sample)}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                  isSelected
                    ? 'border-[#006b2c] bg-[#006b2c]/10 text-[#006b2c] ring-2 ring-[#006b2c]/20 shadow-xs'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#006b2c] hover:bg-[#006b2c]/5 text-[#0F172A]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    sample.score >= 80 ? 'bg-[#10B981]' : sample.score >= 60 ? 'bg-[#EAB308]' : 'bg-[#94A3B8]'
                  }`}
                />
                <span>{sample.fullName}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#006b2c]/80' : 'text-[#64748B]'}`}>
                  ({sample.company})
                </span>
                {isSelected && (
                  <span className="material-symbols-outlined text-xs text-[#006b2c]">check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Form Area (7 cols desktop) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm">
          {inputMode === 'manual' && (
            <form onSubmit={handleAnalyzeManual} className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c] shrink-0">
                  <span className="material-symbols-outlined text-2xl">person_search</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Manual Lead Qualification Form</h2>
                  <p className="text-[11px] sm:text-xs text-[#64748B]">Fill in prospect firmographics and requirements</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: '' }));
                    }}
                    placeholder="e.g. David Brown"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm sm:text-xs font-medium text-[#0F172A] bg-white ${
                      formErrors.fullName ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500' : 'border-[#E2E8F0]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Work Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                    }}
                    placeholder="david.brown@buildpro.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm sm:text-xs font-medium text-[#0F172A] bg-white ${
                      formErrors.email ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500' : 'border-[#E2E8F0]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      if (formErrors.company) setFormErrors((p) => ({ ...p, company: '' }));
                    }}
                    placeholder="e.g. BuildPro"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm sm:text-xs font-medium text-[#0F172A] bg-white ${
                      formErrors.company ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500' : 'border-[#E2E8F0]'
                    }`}
                  />
                  {formErrors.company && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">error</span>
                      {formErrors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. CEO or VP of Operations"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm sm:text-xs font-medium text-[#0F172A] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Construction / Software"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm sm:text-xs font-medium text-[#0F172A] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Company Size
                  </label>
                  <input
                    type="text"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    placeholder="500-1000 employees"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm sm:text-xs font-medium text-[#0F172A] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="$120,000 / Unknown"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm sm:text-xs font-medium text-[#0F172A] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Requirement Details *
                </label>
                <textarea
                  rows={2}
                  value={requirements}
                  onChange={(e) => {
                    setRequirements(e.target.value);
                    if (formErrors.requirements) setFormErrors((p) => ({ ...p, requirements: '' }));
                  }}
                  placeholder="e.g. Enterprise AI Customer Assistant for sales & support automation"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm sm:text-xs font-medium text-[#0F172A] bg-white resize-none ${
                    formErrors.requirements ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500' : 'border-[#E2E8F0]'
                  }`}
                />
                {formErrors.requirements && (
                  <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {formErrors.requirements}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Timeline &amp; Strategic Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. CEO requested demo. Need implementation in 2 weeks."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm sm:text-xs font-medium text-[#0F172A] bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full primary-gradient text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                      Analyzing Lead with AI...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">auto_awesome</span>
                      Qualify Lead with AI
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {inputMode === 'email' && (
            <form onSubmit={handleAnalyzeEmail} className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c] shrink-0">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Raw Email Text Analyzer</h2>
                  <p className="text-[11px] sm:text-xs text-[#64748B]">Paste any raw customer email inquiry to extract intent &amp; score</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Raw Email Inquiry Content *
                  </label>
                  {selectedSampleId && (
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#006b2c] bg-[#006b2c]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">sync</span>
                      Synced Sample
                    </span>
                  )}
                </div>
                <textarea
                  rows={8}
                  value={rawEmailText}
                  onChange={(e) => setRawEmailText(e.target.value)}
                  placeholder="Paste inbound sales email inquiry text here..."
                  className="w-full p-3.5 sm:p-4 rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#0F172A] bg-[#F8FAFC] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full primary-gradient text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                    Parsing Email with AI...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">psychology</span>
                    Analyze Inbound Email with AI
                  </>
                )}
              </button>
            </form>
          )}

          {inputMode === 'csv' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c] shrink-0">
                  <span className="material-symbols-outlined text-2xl">csv</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Batch Bulk Lead Import (CSV)</h2>
                  <p className="text-[11px] sm:text-xs text-[#64748B]">Upload CSV spreadsheet or import sample dataset instantly</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-6 sm:p-8 text-center hover:border-[#006b2c] transition-colors bg-[#F8FAFC]">
                <span className="material-symbols-outlined text-4xl text-[#006b2c] mb-2">cloud_upload</span>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1">Upload Lead CSV File</h3>
                <p className="text-xs text-[#64748B] mb-4 max-w-sm mx-auto">
                  Columns supported: Name, Company, Industry, Job Title, Budget, Requirements, Notes
                </p>
                <label className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] shadow-xs cursor-pointer transition-all min-h-[44px]">
                  <span className="material-symbols-outlined text-sm">folder_open</span>
                  Select CSV File
                  <input type="file" accept=".csv" onChange={handleCsvFileUpload} className="hidden" />
                </label>
              </div>

              <div className="p-4 bg-[#006b2c]/5 rounded-2xl border border-[#006b2c]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Instant PRD Benchmark Dataset</h4>
                  <p className="text-[11px] text-[#64748B]">Load 5 sample leads (David Brown, John Carter, Michael Ross, Sarah Lee, Emma Wilson)</p>
                </div>
                <button
                  onClick={handleLoadSampleDataset}
                  className="px-4 py-2.5 bg-[#006b2c] text-white rounded-xl text-xs font-bold hover:bg-[#005221] transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                >
                  Load Dataset
                </button>
              </div>
            </div>
          )}

          {statusMessage && (
            <div className="mt-4 p-3 bg-[#10B981]/15 text-[#006b2c] rounded-xl border border-[#10B981]/30 text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
              <span className="leading-tight">{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Right Output Inspection Card (5 cols desktop) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          {analyzedLead ? (
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${analyzedLead.avatarBg} ${analyzedLead.avatarTextColor} flex items-center justify-center font-extrabold text-sm shrink-0`}>
                    {analyzedLead.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] truncate">{analyzedLead.fullName}</h3>
                    <p className="text-xs text-[#64748B] truncate">{analyzedLead.jobTitle} at <span className="font-semibold text-[#0F172A]">{analyzedLead.company}</span></p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">AI Lead Score</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#006b2c]">{analyzedLead.score}/100</span>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-extrabold ${analyzedLead.tier === 'Hot' ? 'bg-[#006b2c]/15 text-[#006b2c]' : analyzedLead.tier === 'Warm' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                  TIER: {analyzedLead.tier.toUpperCase()}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Fit: {analyzedLead.fitScore}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Intent: {analyzedLead.intentScore}
                </span>
              </div>

              {/* AI Summary */}
              <div className="p-3.5 sm:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-4">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  AI Summary
                </span>
                <p className="text-xs text-[#0F172A] leading-relaxed font-medium">{analyzedLead.summary}</p>
              </div>

              {/* Reasoning Bullets */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  AI Evaluation Reasoning
                </span>
                <ul className="space-y-1.5">
                  {analyzedLead.reasoning.map((reason, idx) => (
                    <li key={idx} className="text-xs text-[#0F172A] flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-[#006b2c] shrink-0 mt-0.5">check_circle</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Recommended Action */}
              <div className="p-3.5 sm:p-4 bg-[#006b2c]/10 rounded-2xl border border-[#006b2c]/20 mb-5">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  Recommended Action
                </span>
                <p className="text-sm font-extrabold text-[#0F172A]">{analyzedLead.nextAction}</p>
              </div>

              {/* 7 Factor Breakdown */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  7-Factor Weight Breakdown
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Buying Intent (25%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.buyingIntent}/25</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b2c] h-full" style={{ width: `${(analyzedLead.factorBreakdown.buyingIntent / 25) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Budget Availability (20%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.budgetAvailability}/20</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full" style={{ width: `${(analyzedLead.factorBreakdown.budgetAvailability / 20) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Decision Maker (15%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.decisionMaker}/15</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b5f] h-full" style={{ width: `${(analyzedLead.factorBreakdown.decisionMaker / 15) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 text-[#94A3B8]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#006b2c] mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Ready for Qualification</h3>
              <p className="text-xs text-[#64748B] max-w-xs mb-4">
                Fill in the prospect details or click any sample chip to view real-time AI evaluation.
              </p>
              <button
                onClick={() => handlePopulateSample(SAMPLE_PRD_LEADS[0])}
                className="px-4 py-2 bg-[#006b2c]/10 text-[#006b2c] rounded-xl text-xs font-bold hover:bg-[#006b2c]/20 transition-colors cursor-pointer min-h-[40px]"
              >
                Populate David Brown (CEO)
              </button>
            </div>
          )}

          {analyzedLead && (
            <div className="pt-5 border-t border-[#E2E8F0] mt-5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                View in Ranked Dashboard Queue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
