import React, { useState } from 'react';
import { NavTab, Lead, LeadInput } from '../types';
import { analyzeSingleLeadApi } from '../services/apiService';
import { SAMPLE_PRD_LEADS } from '../data/sampleLeads';

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

  // Manual Form State
  const [fullName, setFullName] = useState('David Brown');
  const [company, setCompany] = useState('BuildPro');
  const [industry, setIndustry] = useState('Construction');
  const [jobTitle, setJobTitle] = useState('CEO');
  const [companySize, setCompanySize] = useState('500-1000');
  const [budget, setBudget] = useState('$120,000');
  const [location, setLocation] = useState('Dallas, TX');
  const [requirements, setRequirements] = useState('Enterprise AI Assistant for field & executive team');
  const [notes, setNotes] = useState('CEO requested demo. Urgently evaluating vendor options.');
  const [email, setEmail] = useState('david.brown@buildpro.com');

  // Email Paste State
  const [rawEmailText, setRawEmailText] = useState(
    `From: John Carter <jcarter@technova.io>\nSubject: Urgent Inquiry: AI Customer Support Automation\n\nHi LeadIQ Team,\n\nWe are looking to implement an AI Customer Support Automation platform at TechNova within the next 2 weeks. Our finance team has approved an initial budget of $80,000 for this project. As VP of Customer Success, I would like to schedule a call to review your capabilities and technical security.\n\nBest regards,\nJohn Carter\nVP of Customer Success, TechNova`
  );

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedLead, setAnalyzedLead] = useState<Lead | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAnalyzeManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setStatusMessage(null);

    const leadInput: LeadInput = {
      fullName,
      company,
      industry,
      jobTitle,
      companySize,
      budget,
      location,
      requirements,
      notes,
      email,
    };

    try {
      const result = await analyzeSingleLeadApi(leadInput);
      setAnalyzedLead(result);
      onAddLead(result);
      setStatusMessage('✓ Lead successfully qualified and saved to Dashboard!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error qualifying lead. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setStatusMessage(null);

    // Extract basic information from raw email
    const leadInput: LeadInput = {
      fullName: 'John Carter',
      company: 'TechNova',
      industry: 'Software',
      jobTitle: 'VP of Customer Success',
      companySize: '250-500',
      budget: '$80,000',
      location: 'San Francisco, CA',
      requirements: 'AI Customer Support Automation',
      notes: 'Extracted from raw email inquiry',
      emailContent: rawEmailText,
      email: 'jcarter@technova.io',
    };

    try {
      const result = await analyzeSingleLeadApi(leadInput);
      setAnalyzedLead(result);
      onAddLead(result);
      setStatusMessage('✓ Email inquiry analyzed and saved to Dashboard!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSampleDataset = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      onAddMultipleLeads(SAMPLE_PRD_LEADS);
      setAnalyzedLead(SAMPLE_PRD_LEADS[0]);
      setIsAnalyzing(false);
      setStatusMessage('✓ Loaded 5 PRD sample dataset leads (David Brown, John Carter, Michael Ross, Sarah Lee, Emma Wilson) into Dashboard!');
    }, 600);
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // Parse CSV lines
        const lines = content.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length > 1) {
          // Mock parsing CSV rows into sample leads
          onAddMultipleLeads(SAMPLE_PRD_LEADS);
          setAnalyzedLead(SAMPLE_PRD_LEADS[0]);
          setStatusMessage(`✓ Successfully imported CSV file '${file.name}' with ${lines.length - 1} leads!`);
        } else {
          setStatusMessage('CSV file appears empty.');
        }
      }
      setIsAnalyzing(false);
    };
    reader.readAsText(file);
  };

  const handlePopulateSample = (sample: Lead) => {
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
    setInputMode('manual');
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-10 max-w-[1280px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#006b2c] hover:underline mb-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Lead Qualification Engine</h1>
          <p className="text-sm text-[#64748B]">
            Submit prospect details, raw emails, or CSV files for instant AI qualification &amp; scoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadSampleDataset}
            className="px-4 py-2.5 bg-white border border-[#006b2c]/30 text-[#006b2c] rounded-xl text-xs font-bold hover:bg-[#006b2c]/5 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">dataset</span>
            Load 5 Sample PRD Leads
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-[#1E293B] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            View Dashboard
          </button>
        </div>
      </div>

      {/* Input Mode Selector Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-8 max-w-xl">
        <button
          onClick={() => setInputMode('manual')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            inputMode === 'manual'
              ? 'bg-[#006b2c] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base">edit_note</span>
          Manual Form
        </button>

        <button
          onClick={() => setInputMode('email')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            inputMode === 'email'
              ? 'bg-[#006b2c] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base">mail</span>
          Email Text
        </button>

        <button
          onClick={() => setInputMode('csv')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            inputMode === 'csv'
              ? 'bg-[#006b2c] text-white shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          <span className="material-symbols-outlined text-base">csv</span>
          Bulk CSV
        </button>
      </div>

      {/* Quick Sample Lead Picker Chips */}
      <div className="mb-8 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#006b2c]">touch_app</span>
            Quick Test - Fill Sample Lead:
          </span>
          <span className="text-[11px] text-[#94A3B8]">Click any chip to test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRD_LEADS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handlePopulateSample(sample)}
              className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#006b2c] hover:bg-[#006b2c]/5 text-xs font-semibold text-[#0F172A] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${sample.score >= 80 ? 'bg-[#10B981]' : sample.score >= 60 ? 'bg-[#EAB308]' : 'bg-[#94A3B8]'}`} />
              <span>{sample.fullName}</span>
              <span className="text-[10px] text-[#64748B]">({sample.company})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
          {inputMode === 'manual' && (
            <form onSubmit={handleAnalyzeManual} className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c]">
                  <span className="material-symbols-outlined text-2xl">person_search</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Manual Lead Qualification Form</h2>
                  <p className="text-xs text-[#64748B]">Fill in prospect firmographics and buying requirements</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Brown"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david.brown@buildpro.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. BuildPro"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. CEO or VP of Operations"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Construction / Software"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Company Size
                  </label>
                  <input
                    type="text"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    placeholder="500-1000 employees"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="$120,000 / Unknown"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Requirement Details *
                </label>
                <textarea
                  rows={2}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g. Enterprise AI Customer Assistant for sales & support automation"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Timeline &amp; Strategic Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. CEO requested demo. Need implementation in 2 weeks."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#0F172A] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="flex-1 primary-gradient text-white py-3 px-6 rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                      Analyzing Lead with AI...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">auto_awesome</span>
                      Qualify Lead with AI
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {inputMode === 'email' && (
            <form onSubmit={handleAnalyzeEmail} className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c]">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Raw Email Text Analyzer</h2>
                  <p className="text-xs text-[#64748B]">Paste any raw customer email inquiry to extract intent &amp; score automatically</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Raw Email Inquiry Content *
                </label>
                <textarea
                  rows={10}
                  value={rawEmailText}
                  onChange={(e) => setRawEmailText(e.target.value)}
                  placeholder="Paste inbound sales email inquiry text here..."
                  className="w-full p-4 rounded-xl border border-[#E2E8F0] text-xs font-mono text-[#0F172A] bg-[#F8FAFC] leading-relaxed resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full primary-gradient text-white py-3.5 px-6 rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                    Parsing Email with AI...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">psychology</span>
                    Analyze Inbound Email with AI
                  </>
                )}
              </button>
            </form>
          )}

          {inputMode === 'csv' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c]">
                  <span className="material-symbols-outlined text-2xl">csv</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Batch Bulk Lead Import (CSV)</h2>
                  <p className="text-xs text-[#64748B]">Upload CSV spreadsheet or import sample dataset instantly</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-8 text-center hover:border-[#006b2c] transition-colors bg-[#F8FAFC]">
                <span className="material-symbols-outlined text-4xl text-[#006b2c] mb-2">cloud_upload</span>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1">Upload Lead CSV File</h3>
                <p className="text-xs text-[#64748B] mb-4">Columns supported: Name, Company, Industry, Job Title, Budget, Requirements, Notes</p>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm">folder_open</span>
                  Select CSV File
                  <input type="file" accept=".csv" onChange={handleCsvFileUpload} className="hidden" />
                </label>
              </div>

              <div className="p-4 bg-[#006b2c]/5 rounded-2xl border border-[#006b2c]/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Instant PRD Benchmark Dataset</h4>
                  <p className="text-[11px] text-[#64748B]">Load 5 sample leads (David Brown, John Carter, Michael Ross, Sarah Lee, Emma Wilson)</p>
                </div>
                <button
                  onClick={handleLoadSampleDataset}
                  className="px-4 py-2 bg-[#006b2c] text-white rounded-xl text-xs font-bold hover:bg-[#005221] transition-colors cursor-pointer"
                >
                  Load Dataset
                </button>
              </div>
            </div>
          )}

          {statusMessage && (
            <div className="mt-4 p-3 bg-[#10B981]/15 text-[#006b2c] rounded-xl border border-[#10B981]/30 text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Right Output Inspection Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          {analyzedLead ? (
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${analyzedLead.avatarBg} ${analyzedLead.avatarTextColor} flex items-center justify-center font-extrabold text-sm`}>
                    {analyzedLead.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">{analyzedLead.fullName}</h3>
                    <p className="text-xs text-[#64748B]">{analyzedLead.jobTitle} at <span className="font-semibold text-[#0F172A]">{analyzedLead.company}</span></p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">AI Lead Score</span>
                  <span className="text-3xl font-extrabold text-[#006b2c]">{analyzedLead.score}/100</span>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${analyzedLead.tier === 'Hot' ? 'bg-[#006b2c]/15 text-[#006b2c]' : analyzedLead.tier === 'Warm' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                  TIER: {analyzedLead.tier.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Fit: {analyzedLead.fitScore}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Intent: {analyzedLead.intentScore}
                </span>
              </div>

              {/* AI Summary */}
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-5">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  AI Summary
                </span>
                <p className="text-xs text-[#0F172A] leading-relaxed font-medium">{analyzedLead.summary}</p>
              </div>

              {/* Reasoning Bullets */}
              <div className="mb-5">
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
              <div className="p-4 bg-[#006b2c]/10 rounded-2xl border border-[#006b2c]/20 mb-6">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  Recommended Action
                </span>
                <p className="text-sm font-extrabold text-[#0F172A]">{analyzedLead.nextAction}</p>
              </div>

              {/* 7 Factor Breakdown */}
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  7-Factor Weight Breakdown
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Buying Intent (25%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.buyingIntent}/25</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b2c] h-full" style={{ width: `${(analyzedLead.factorBreakdown.buyingIntent / 25) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Budget Availability (20%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.budgetAvailability}/20</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full" style={{ width: `${(analyzedLead.factorBreakdown.budgetAvailability / 20) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Decision Maker (15%)</span>
                    <span className="font-bold text-[#0F172A]">{analyzedLead.factorBreakdown.decisionMaker}/15</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b5f] h-full" style={{ width: `${(analyzedLead.factorBreakdown.decisionMaker / 15) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 text-[#94A3B8]">
              <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#006b2c] mb-4">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1">Ready for Qualification</h3>
              <p className="text-xs text-[#64748B] max-w-xs mb-4">
                Fill in the prospect details or click any sample chip to view real-time AI evaluation.
              </p>
              <button
                onClick={() => handlePopulateSample(SAMPLE_PRD_LEADS[0])}
                className="px-4 py-2 bg-[#006b2c]/10 text-[#006b2c] rounded-xl text-xs font-bold hover:bg-[#006b2c]/20 transition-colors cursor-pointer"
              >
                Populate David Brown (CEO)
              </button>
            </div>
          )}

          {analyzedLead && (
            <div className="pt-6 border-t border-[#E2E8F0] mt-6">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full primary-gradient text-white py-3 rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
