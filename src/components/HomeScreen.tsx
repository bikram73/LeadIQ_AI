import React from 'react';
import { NavTab } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 md:pt-24 pb-16">
      {/* Hero Section */}
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
                Intelligent Sales AI
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#0F172A] leading-tight tracking-tight text-balance">
              Qualify, Score &amp; <span className="text-[#006b2c]">Prioritize</span> Sales Leads with AI
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed text-balance mx-auto sm:mx-0">
              LeadIQ AI utilizes state-of-the-art AI models to automatically analyze firmographics, behavioral data, and buying intent. Stop wasting time on cold leads and focus on what converts.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('analyzer')}
                className="w-full sm:w-auto primary-gradient text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                Analyze Leads Now
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto bg-white border border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#F8FAFC] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span className="material-symbols-outlined text-xl">leaderboard</span>
                View Dashboard
              </button>
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

      {/* Stats Grid Section */}
      <section className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">98%</h3>
            <p className="text-xs sm:text-sm font-medium text-[#64748B]">AI Qualification Accuracy</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">7-Factor</h3>
            <p className="text-xs sm:text-sm font-medium text-[#64748B]">Deterministic Model</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">&lt;3s</h3>
            <p className="text-xs sm:text-sm font-medium text-[#64748B]">Real-Time Response</p>
          </div>
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-xs">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#006b2c] mb-1">100%</h3>
            <p className="text-xs sm:text-sm font-medium text-[#64748B]">Privacy &amp; Zero DB Lock</p>
          </div>
        </div>
      </section>

      {/* Feature Grid (Bento Style) */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto" id="features">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            Powerful Lead Intelligence
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto text-balance">
            Our multi-layered AI analysis provides unprecedented clarity into your sales pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Bento Item 1 */}
          <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] flex flex-col justify-between hover:shadow-lg transition-all min-h-[300px] sm:min-h-[360px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="w-12 h-12 bg-[#006b2c]/10 rounded-xl flex items-center justify-center text-[#006b2c]">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Deterministic AI Lead Scoring</h3>
              <p className="text-sm sm:text-base text-[#64748B] max-w-md leading-relaxed">
                Our mathematical engine calculates strict 0-100 scores across 7 weighted factors including intent, budget, and authority.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                Profile Match: 95%
              </div>
              <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                Intent: High
              </div>
              <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                Budget: Verified
              </div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="md:col-span-4 bg-[#006b2c] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:shadow-lg transition-all min-h-[300px] sm:min-h-[360px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Buying Intent Detection</h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Recognize explicit signals and purchase urgency in customer inquiries before outreach.
              </p>
            </div>
            <button
              onClick={() => onNavigate('scoring-logic')}
              className="mt-6 w-fit bg-white text-[#006b2c] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-white/90 transition-colors cursor-pointer min-h-[40px]"
            >
              Learn More
            </button>
          </div>

          {/* Bento Item 3 */}
          <div className="md:col-span-4 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] flex flex-col gap-3 sm:gap-4 hover:shadow-lg transition-all min-h-[240px]">
            <div className="w-12 h-12 bg-[#006b5f]/10 rounded-xl flex items-center justify-center text-[#006b5f]">
              <span className="material-symbols-outlined text-3xl">sort</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">Smart Lead Ranking</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Instantly rank and sort all leads in real-time based on deterministic multi-factor qualification criteria.
            </p>
          </div>

          {/* Bento Item 4 */}
          <div className="md:col-span-8 bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] flex flex-col sm:flex-row gap-6 items-center hover:shadow-lg transition-all min-h-[240px]">
            <div className="flex-1 flex flex-col gap-3">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">AI Next-Step Actions</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Get prescriptive next actions: "Schedule Executive Demo", "Send Proposal", or "Add to Nurture Campaign".
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="p-4 bg-white rounded-xl shadow-xs border border-[#E2E8F0]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#006b2c]/20 flex items-center justify-center text-[#006b2c] text-[10px] font-bold">AI</div>
                  <span className="text-xs font-bold text-[#0F172A]">Recommended Action</span>
                </div>
                <p className="text-xs font-semibold text-[#006b2c] bg-[#006b2c]/5 p-2 rounded-lg">
                  Schedule Executive Demo (High Intent)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F8FAFC] py-12 sm:py-20 border-y border-[#E2E8F0]">
        <div className="px-4 sm:px-6 md:px-10 max-w-[1280px] mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A]">
              Simple 4-Step Intelligence
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mt-2 text-balance">
              Qualify any lead in seconds with zero authentication friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 items-center text-center p-4 bg-white sm:bg-transparent rounded-2xl border sm:border-0 border-[#E2E8F0]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#006b2c] text-3xl">upload_file</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-1">1. Ingest</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">Enter lead form, paste raw customer email, or upload CSV spreadsheet.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center text-center p-4 bg-white sm:bg-transparent rounded-2xl border sm:border-0 border-[#E2E8F0]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#006b2c] text-3xl">query_stats</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-1">2. Extract</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">AI analyzes firmographics, buying authority, budget, and urgency signals.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center text-center p-4 bg-white sm:bg-transparent rounded-2xl border sm:border-0 border-[#E2E8F0]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#006b2c] text-3xl">rule_folder</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-1">3. Score</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">Computes 7-factor deterministic score and classifies Hot/Warm/Cold tier.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center text-center p-4 bg-white sm:bg-transparent rounded-2xl border sm:border-0 border-[#E2E8F0]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#006b2c] text-3xl">contact_mail</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-1">4. Action</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">Engage high-priority prospects immediately with tailored sales rationale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 md:px-10 py-12 sm:py-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden bg-white p-2 border border-[#E2E8F0]">
            <img
              src="/team-collaboration-ai.svg"
              alt="AI Driven Team Collaboration & Revenue Acceleration"
              className="w-full h-full object-contain rounded-xl"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight text-balance">
              Why Choose AI-Driven Lead Qualification?
            </h2>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex gap-3 sm:gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">timer</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0F172A] mb-0.5">Unrivaled Time Saving</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">Manual lead scrubbing takes hours. LeadIQ AI evaluates in seconds, freeing sales reps for closing deals.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">trending_up</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0F172A] mb-0.5">Higher Conversion Rates</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">Prioritize genuine buyers with verified budgets and executive authority to accelerate deal velocity.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">info</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0F172A] mb-0.5">Explainable AI Insights</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">Never a black-box score. Get granular 7-factor breakdowns and contextual bulleted reasoning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 max-w-[1280px] mx-auto">
        <div className="primary-gradient rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10 text-balance">
            Ready to transform your sales qualification?
          </h2>
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
