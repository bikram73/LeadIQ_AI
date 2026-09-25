import React, { useState } from 'react';
import { NavTab } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // Interactive mini simulator state for the landing page
  const [simulatorProfile, setSimulatorProfile] = useState<'enterprise' | 'midmarket' | 'early'>('enterprise');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const simulationPresets = {
    enterprise: {
      name: 'David Brown',
      company: 'BuildPro Enterprises',
      role: 'Chief Executive Officer (CEO)',
      budget: '$120,000 / yr',
      timeline: 'Immediate (2 Weeks)',
      requirements: 'Enterprise-wide AI workflow assistant & CRM integration',
      score: 97,
      tier: 'Hot',
      action: 'Schedule Executive Demo (C-Level Sponsor)',
      intent: 'High (25/25)',
      budgetScore: 'Verified (20/20)',
      authority: 'Decision Maker (15/15)',
    },
    midmarket: {
      name: 'Michael Ross',
      company: 'RetailMax Solutions',
      role: 'Head of E-Commerce',
      budget: '$15,000 / project',
      timeline: 'Next Quarter (1-3 Months)',
      requirements: 'Product search optimization & automated customer FAQ',
      score: 81,
      tier: 'Warm',
      action: 'Send Proposal & Technical Demo',
      intent: 'Medium (18/25)',
      budgetScore: 'Moderate (14/20)',
      authority: 'Influencer (13/15)',
    },
    early: {
      name: 'Emma Wilson',
      company: 'CreativeAds Agency',
      role: 'Marketing Coordinator',
      budget: 'Undecided / <$5,000',
      timeline: 'Exploring for next year',
      requirements: 'General AI tools information and feature overview',
      score: 42,
      tier: 'Cold',
      action: 'Add to Nurture Campaign & Send Whitepaper',
      intent: 'Low (8/25)',
      budgetScore: 'Unallocated (6/20)',
      authority: 'Individual (6/15)',
    },
  };

  const currentSim = simulationPresets[simulatorProfile];

  const faqs = [
    {
      q: 'How does LeadIQ AI calculate the 0-100 numerical lead score?',
      a: 'LeadIQ AI combines large language model contextual reasoning with a strict 7-factor mathematical scoring model. Factors include Buying Intent (25%), Budget Availability (20%), Decision Maker Role Authority (15%), Timeline & Urgency (15%), Company Size (10%), Industry Fit (10%), and Requirement Clarity (5%). The result is an objective, deterministic score between 0 and 100.',
    },
    {
      q: 'Can I paste unformatted customer emails directly without filling form fields?',
      a: 'Yes! The Inbound Email Analyzer feature uses deep NLP extraction to automatically parse raw contact names, company organizations, estimated budget figures, implementation timelines, and specific technical requirements directly from pasted email threads or web inquiry messages.',
    },
    {
      q: 'What happens if our team uploads a bulk CSV file with hundreds of leads?',
      a: 'The Bulk CSV Ingestion engine accepts standard spreadsheets with columns like Name, Company, Role, Budget, and Requirements. It batch-qualifies and re-ranks all records in seconds, outputting a fully prioritized pipeline ready for export to Salesforce, HubSpot, or CSV.',
    },
    {
      q: 'Is my lead data stored securely or trained on external models?',
      a: 'Your leads and qualification results are processed in-memory and stored locally in your browser session. Lead data is never saved to public database registries or used to train third-party foundation models.',
    },
    {
      q: 'What happens if the AI service encounters network latency or API rate limits?',
      a: 'LeadIQ AI is engineered with an automated zero-downtime semantic fallback heuristic engine. If API connectivity is interrupted, the built-in deterministic heuristic scoring engine immediately scores and ranks your pipeline with zero interruption.',
    },
  ];

  return (
    <div className="pt-20 md:pt-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 md:px-10 py-8 sm:py-14 md:py-20 max-w-[1280px] mx-auto overflow-hidden">
        <div className="hero-shape absolute top-[-100px] right-[-100px] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#006b2c]/10 rounded-full pointer-events-none" />
        <div className="hero-shape absolute bottom-0 left-[-50px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#006b5f]/10 rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-3.5 py-1.5 rounded-full w-fit mx-auto sm:mx-0">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                Intelligent B2B Sales Agent
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#0F172A] leading-tight tracking-tight text-balance">
              Qualify, Score &amp; <span className="text-[#006b2c]">Prioritize</span> Sales Leads with AI
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed text-balance mx-auto sm:mx-0">
              Transform raw contact submissions, messy inbound emails, and batch CSV lead sheets into ranked, scored, and action-ready prospect pipelines in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('analyzer')}
                className="w-full sm:w-auto primary-gradient text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                Qualify Leads Now
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto bg-white border border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#F8FAFC] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="material-symbols-outlined text-xl">leaderboard</span>
                View Live Pipeline
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#006b2c]">verified</span>
                <span>7-Factor Reasoning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#006b2c]">speed</span>
                <span>&lt;3s Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#006b2c]">download</span>
                <span>CSV &amp; JSON Export</span>
              </div>
            </div>
          </div>

          <div className="relative group mt-6 lg:mt-0 w-full max-w-md lg:max-w-none mx-auto">
            {/* Hero Main Graphic Card */}
            <div className="glass-card p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-[#E2E8F0] flex items-center justify-center bg-white/95 backdrop-blur-md relative">
              <img
                className="w-full h-auto max-h-[340px] sm:max-h-[380px] md:max-h-[410px] rounded-xl object-contain shadow-xs"
                src="/hero-lead-qualification.svg"
                alt="AI Lead Qualified Flow with Intent, Budget, Authority"
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-36 h-36 bg-[#006b2c]/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Floating Stat Overlay */}
            <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-3 md:-top-5 md:-left-4 glass-card p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl shadow-lg border border-[#E2E8F0] bg-white/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-[#10B981] rounded-lg md:rounded-xl text-white shadow-xs flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white text-base sm:text-lg md:text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-[#64748B]">Lead Quality</p>
                  <p className="text-base sm:text-lg md:text-xl font-extrabold text-[#0F172A] tracking-tight">+42% Higher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Stats Section */}
      <section className="px-4 sm:px-6 md:px-10 py-6 sm:py-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white p-4 sm:p-6 md:p-7 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">98%</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">AI Qualification Accuracy</p>
            <p className="text-[11px] text-[#64748B] mt-1">Ground truth verified on enterprise dataset</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-7 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">7-Factor</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">Deterministic Matrix</p>
            <p className="text-[11px] text-[#64748B] mt-1">100-point transparent mathematical weight</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-7 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">&lt;3s</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">Instant AI Scoring</p>
            <p className="text-[11px] text-[#64748B] mt-1">Zero manual spreadsheet scrubbing</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-7 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">100%</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">Privacy &amp; Data Control</p>
            <p className="text-[11px] text-[#64748B] mt-1">Local session storage with one-click export</p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Lead Scoring Simulator */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-[#006b2c]/10 text-[#006b2c] rounded-lg">
                  <span className="material-symbols-outlined text-base">science</span>
                </span>
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider">
                  Interactive Evaluation Sandbox
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                See How AI Evaluates Real Sales Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Select a sample prospect profile to test real-time 7-factor scoring and sales action generation.
              </p>
            </div>

            {/* Profile Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-xl self-start md:self-auto">
              <button
                onClick={() => setSimulatorProfile('enterprise')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  simulatorProfile === 'enterprise'
                    ? 'bg-white text-[#006b2c] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Hot Lead (CEO)
              </button>
              <button
                onClick={() => setSimulatorProfile('midmarket')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  simulatorProfile === 'midmarket'
                    ? 'bg-white text-[#10B981] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Warm Lead (Dept Head)
              </button>
              <button
                onClick={() => setSimulatorProfile('early')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  simulatorProfile === 'early'
                    ? 'bg-white text-[#64748B] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Cold Lead (Explorer)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Prospect Card */}
            <div className="lg:col-span-6 p-5 sm:p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A]">{currentSim.name}</h3>
                  <p className="text-xs text-[#006b2c] font-semibold">{currentSim.company}</p>
                </div>
                <span className="text-xs font-bold bg-white px-3 py-1 rounded-full border border-[#E2E8F0] text-[#64748B]">
                  {currentSim.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] text-[11px] block">Stated Budget</span>
                  <strong className="text-[#0F172A] font-bold">{currentSim.budget}</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] text-[11px] block">Timeline</span>
                  <strong className="text-[#0F172A] font-bold">{currentSim.timeline}</strong>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-xs">
                <span className="text-[#64748B] text-[11px] block mb-0.5">Project Requirements</span>
                <p className="text-[#0F172A] font-medium leading-relaxed">{currentSim.requirements}</p>
              </div>
            </div>

            {/* Live AI Qualification Output */}
            <div className="lg:col-span-6 p-5 sm:p-6 bg-[#006b2c]/5 rounded-2xl border border-[#006b2c]/20 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-[#006b2c]/15">
                <div>
                  <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-wider block">
                    Calculated Lead Score
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#006b2c]">{currentSim.score}</span>
                    <span className="text-xs text-[#64748B] font-bold">/100</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                      currentSim.score >= 90
                        ? 'bg-[#006b2c] text-white'
                        : currentSim.score >= 70
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#64748B] text-white'
                    }`}
                  >
                    {currentSim.tier.toUpperCase()} TIER
                  </span>
                </div>
              </div>

              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#0F172A]">
                  <span className="text-[#64748B]">Buying Intent:</span>
                  <strong className="font-bold">{currentSim.intent}</strong>
                </div>
                <div className="flex justify-between text-[#0F172A]">
                  <span className="text-[#64748B]">Budget Fit:</span>
                  <strong className="font-bold">{currentSim.budgetScore}</strong>
                </div>
                <div className="flex justify-between text-[#0F172A]">
                  <span className="text-[#64748B]">Decision Authority:</span>
                  <strong className="font-bold">{currentSim.authority}</strong>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#006b2c]/20 mt-1">
                <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-wider block mb-0.5">
                  AI Prescribed Action
                </span>
                <p className="text-xs font-extrabold text-[#0F172A]">{currentSim.action}</p>
              </div>

              <button
                onClick={() => onNavigate('analyzer')}
                className="mt-4 w-full primary-gradient text-white py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Run Full Analysis in Lead Analyzer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Multi-Modal Ingestion Channels */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-3.5 py-1.5 rounded-full mb-3">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span className="text-xs font-bold uppercase tracking-wider">Multi-Modal Ingestion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            Three Powerful Ways to Ingest Opportunities
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto text-balance">
            Whether qualification is initiated manually, via raw email forward, or bulk batch spreadsheets, LeadIQ AI standardizes every prospect into a unified scoring format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#006b2c]/40 transition-all">
            <div>
              <div className="w-12 h-12 bg-[#006b2c]/10 text-[#006b2c] rounded-2xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">edit_note</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">1. Manual Lead Form</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                Structured input for SDRs and Account Executives. Fill out company size, exact budget allocation, specific software requirements, and qualitative sales notes.
              </p>
              <ul className="text-xs text-[#0F172A] space-y-1.5 mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">check_circle</span>
                  <span>Instant field validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">check_circle</span>
                  <span>Granular firmographic parameters</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full py-2.5 bg-[#F8FAFC] hover:bg-[#006b2c]/10 text-[#006b2c] border border-[#E2E8F0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Open Manual Form
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#006b2c]/40 transition-all">
            <div>
              <div className="w-12 h-12 bg-[#006b5f]/10 text-[#006b5f] rounded-2xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">mark_email_read</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">2. Inbound Email NLP</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                Paste unformatted email chains, contact form inquiries, or chat transcripts. The AI parses contact metadata, extracted pain points, and purchase urgency automatically.
              </p>
              <ul className="text-xs text-[#0F172A] space-y-1.5 mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5f]">check_circle</span>
                  <span>Zero manual field transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#006b5f]">check_circle</span>
                  <span>Extracts implied budget &amp; deadlines</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full py-2.5 bg-[#F8FAFC] hover:bg-[#006b5f]/10 text-[#006b5f] border border-[#E2E8F0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Try Email Analyzer
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#006b2c]/40 transition-all">
            <div>
              <div className="w-12 h-12 bg-[#10B981]/10 text-[#10B981] rounded-2xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">table_chart</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">3. Bulk CSV Ingestion</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                Drag and drop lead export sheets (.csv). The system handles flexible column naming, qualifies all rows concurrently, and re-ranks the entire batch into a unified dashboard.
              </p>
              <ul className="text-xs text-[#0F172A] space-y-1.5 mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                  <span>Flexible header auto-mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
                  <span>Batch re-ranking &amp; export ready</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full py-2.5 bg-[#F8FAFC] hover:bg-[#10B981]/10 text-[#10B981] border border-[#E2E8F0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Upload Batch CSV
            </button>
          </div>
        </div>
      </section>

      {/* 5. 7-Factor Qualification Weight Architecture */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-xs">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-3.5 py-1.5 rounded-full mb-3">
            <span className="material-symbols-outlined text-sm">account_tree</span>
            <span className="text-xs font-bold uppercase tracking-wider">Evaluation Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            The 7-Factor Weighted Scoring Architecture
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto text-balance">
            Every prospect is evaluated across seven deterministic pillars that total a strict 100-point index.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#006b2c]">FACTOR 1</span>
                <span className="text-xs font-bold bg-[#006b2c]/10 text-[#006b2c] px-2 py-0.5 rounded-md">25% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Buying Intent</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Explicit purchase desire, immediate demo requests, and direct requirement statements.
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#006b2c] h-full rounded-full w-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#10B981]">FACTOR 2</span>
                <span className="text-xs font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-md">20% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Budget Availability</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Stated budget capacity against enterprise pricing tiers ($100k+, $50k+, &lt;$15k).
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#10B981] h-full rounded-full w-[80%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#006b5f]">FACTOR 3</span>
                <span className="text-xs font-bold bg-[#006b5f]/10 text-[#006b5f] px-2 py-0.5 rounded-md">15% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Decision Authority</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Title authority: C-Level (CEO, CTO), VP, Director, vs individual contributor.
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#006b5f] h-full rounded-full w-[60%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#EAB308]">FACTOR 4</span>
                <span className="text-xs font-bold bg-[#EAB308]/15 text-[#CA8A04] px-2 py-0.5 rounded-md">15% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Timeline &amp; Urgency</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Implementation target horizon (immediate &lt;2 weeks vs next quarter or exploratory).
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#EAB308] h-full rounded-full w-[60%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#64748B]">FACTOR 5</span>
                <span className="text-xs font-bold bg-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-md">10% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Company Size Fit</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Headcount scale (500+ enterprise, 100-500 mid-market, 10-50 SMB).
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#64748B] h-full rounded-full w-[40%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#64748B]">FACTOR 6</span>
                <span className="text-xs font-bold bg-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-md">10% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Industry ICP Fit</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Match with high-conversion sectors (Software, Healthcare, Retail, Construction).
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#64748B] h-full rounded-full w-[40%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-[#64748B]">FACTOR 7</span>
                <span className="text-xs font-bold bg-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-md">5% Max</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Requirement Clarity</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Precision of use-case specification vs generic inquiries.
              </p>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#64748B] h-full rounded-full w-[20%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#006b2c] text-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-white/80">TOTAL SCORE</span>
                <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-md">100 Pts</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Unified Prioritization</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Hot (90-100), Warm (70-89), Cold (40-69), Very Low (0-39).
              </p>
            </div>
            <button
              onClick={() => onNavigate('scoring-logic')}
              className="mt-4 w-fit px-3 py-1.5 bg-white text-[#006b2c] rounded-lg text-xs font-bold hover:bg-white/90 transition-colors cursor-pointer"
            >
              Inspect Formulas
            </button>
          </div>
        </div>
      </section>

      {/* 6. Comparison Table: Legacy Scoring vs LeadIQ AI */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            Legacy Lead Scoring vs. LeadIQ AI
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto text-balance">
            Compare traditional static rule-based CRM points with context-aware AI qualification.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-4 px-6">Capability</th>
                  <th className="py-4 px-6 text-[#64748B]">Legacy Rule-Based Scoring</th>
                  <th className="py-4 px-6 text-[#006b2c] bg-[#006b2c]/5">LeadIQ AI Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">Unstructured Email Support</td>
                  <td className="py-4 px-6 text-[#64748B]">❌ Fails (Requires manual SDR data entry)</td>
                  <td className="py-4 px-6 font-bold text-[#006b2c] bg-[#006b2c]/5">✓ Native NLP extraction from raw text</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">Evaluation Speed</td>
                  <td className="py-4 px-6 text-[#64748B]">⏱️ 2 to 24 Hours manual SDR research</td>
                  <td className="py-4 px-6 font-bold text-[#006b2c] bg-[#006b2c]/5">⚡ Sub-3-second instant score &amp; tier</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">Intent Reasoning</td>
                  <td className="py-4 px-6 text-[#64748B]">⚠️ Naive points for page clicks &amp; downloads</td>
                  <td className="py-4 px-6 font-bold text-[#006b2c] bg-[#006b2c]/5">✓ Contextual semantic intent analysis</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">Explainability</td>
                  <td className="py-4 px-6 text-[#64748B]">❓ Black-box sum with no rationale</td>
                  <td className="py-4 px-6 font-bold text-[#006b2c] bg-[#006b2c]/5">✓ 7-Factor breakdown + bulleted reasoning</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">Sales Next Action</td>
                  <td className="py-4 px-6 text-[#64748B]">❌ Static status badge without context</td>
                  <td className="py-4 px-6 font-bold text-[#006b2c] bg-[#006b2c]/5">✓ Prescriptive, tailored executive action</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Section */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-3.5 py-1.5 rounded-full mb-3">
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="text-xs font-bold uppercase tracking-wider">Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto text-balance">
            Everything you need to know about LeadIQ AI scoring, data privacy, and qualification workflows.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0F172A]">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[#006b2c] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="primary-gradient rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 relative z-10 text-balance">
            Ready to Accelerate Your Sales Pipeline?
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
            Stop losing high-value deals to slow qualification cycles. Start scoring and prioritizing inbound sales leads today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto bg-white text-[#006b2c] px-8 py-3.5 rounded-xl font-extrabold text-base shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              Analyze Leads Now
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white/30 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              View Results Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
