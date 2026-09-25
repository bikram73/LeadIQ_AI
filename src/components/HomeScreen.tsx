import React from 'react';
import { NavTab } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 md:px-10 py-12 md:py-20 max-w-[1280px] mx-auto overflow-hidden">
        <div className="hero-shape absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#006b2c]/10 rounded-full pointer-events-none" />
        <div className="hero-shape absolute bottom-0 left-[-50px] w-[300px] h-[300px] bg-[#006b5f]/10 rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-4 py-2 rounded-full w-fit">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                Intelligent Sales AI
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-[#0F172A] leading-tight tracking-tight">
              Qualify, Score &amp; <span className="text-[#006b2c]">Prioritize</span> Sales Leads with AI
            </h1>

            <p className="text-lg text-[#64748B] max-w-xl leading-relaxed">
              LeadIQ AI utilizes state-of-the-art AI models to automatically analyze firmographics, behavioral data, and buying intent. Stop wasting time on cold leads and focus on what converts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('analyzer')}
                className="primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
              >
                Analyze Leads
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white border border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#F8FAFC] active:scale-95 transition-all cursor-pointer"
              >
                View Demo
              </button>
            </div>
          </div>

          <div className="relative group mt-6 lg:mt-0">
            <div className="glass-card p-4 md:p-6 rounded-3xl shadow-2xl overflow-hidden border border-[#E2E8F0]">
              <img
                className="w-full h-auto rounded-xl object-contain shadow-inner"
                src="/hero-lead-qualification.svg"
                alt="AI Lead Qualified Flow with Intent, Budget, Authority"
              />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl" />
            </div>

            {/* Floating Stat Overlay */}
            <div className="absolute -top-4 -left-2 md:-top-6 md:-left-6 glass-card p-3 md:p-4 rounded-2xl shadow-lg border border-[#E2E8F0] animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#10B981] rounded-lg text-white">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B]">Lead Quality</p>
                  <p className="text-xl md:text-2xl font-bold text-[#0F172A]">+42%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-10 py-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-[#006b2c] mb-1">98%</h3>
            <p className="text-sm font-medium text-[#64748B]">AI Accuracy</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-[#006b2c] mb-1">2M+</h3>
            <p className="text-sm font-medium text-[#64748B]">Leads Processed</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-[#006b2c] mb-1">&lt;3s</h3>
            <p className="text-sm font-medium text-[#64748B]">Analysis Time</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] text-center hover:scale-[1.02] transition-transform shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-[#006b2c] mb-1">5x</h3>
            <p className="text-sm font-medium text-[#64748B]">Hot Lead Detection</p>
          </div>
        </div>
      </section>

      {/* Feature Grid (Bento Style) */}
      <section className="px-4 md:px-10 py-16 max-w-[1280px] mx-auto" id="features">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] mb-4">
            Powerful Lead Intelligence
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Our multi-layered AI analysis provides unprecedented clarity into your sales pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1 */}
          <div className="md:col-span-8 bg-white p-8 rounded-3xl border border-[#E2E8F0] flex flex-col justify-between hover:shadow-xl transition-all min-h-[360px]">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-[#006b2c]/10 rounded-xl flex items-center justify-center text-[#006b2c]">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A]">AI Lead Scoring</h3>
              <p className="text-base text-[#64748B] max-w-md">
                Our AI-powered engine assigns 0-100 scores based on historic conversion patterns and real-time lead profile data.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#0F172A]">
                Profile Match: 95%
              </div>
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#0F172A]">
                Intent: High
              </div>
              <div className="bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#0F172A]">
                Budget Fit: Confirmed
              </div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="md:col-span-4 bg-[#006b2c] text-white p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-all min-h-[360px]">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">Buying Intent Detection</h3>
              <p className="text-base text-white/80">
                Recognize signals across the web that indicate a prospect is ready to purchase before they even contact you.
              </p>
            </div>
            <button
              onClick={() => onNavigate('scoring-logic')}
              className="mt-8 w-fit bg-white text-[#006b2c] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-colors cursor-pointer"
            >
              Learn More
            </button>
          </div>

          {/* Bento Item 3 */}
          <div className="md:col-span-4 bg-white p-8 rounded-3xl border border-[#E2E8F0] flex flex-col gap-4 hover:shadow-xl transition-all min-h-[280px]">
            <div className="w-12 h-12 bg-[#006b5f]/10 rounded-xl flex items-center justify-center text-[#006b5f]">
              <span className="material-symbols-outlined text-3xl">sort</span>
            </div>
            <h3 className="text-xl font-semibold text-[#0F172A]">Smart Lead Ranking</h3>
            <p className="text-sm text-[#64748B]">
              Instantly rank and sort all leads in real-time based on deterministic multi-factor qualification criteria.
            </p>
          </div>

          {/* Bento Item 4 */}
          <div className="md:col-span-8 bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0] flex flex-col md:flex-row gap-8 items-center hover:shadow-xl transition-all min-h-[280px]">
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">AI Recommendations</h3>
              <p className="text-sm text-[#64748B]">
                Get prescriptive next steps for every lead: "Connect on LinkedIn", "Send whitepaper", or "Wait 3 days".
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#006b2c]/20 flex items-center justify-center text-[#006b2c] text-xs font-bold">AI</div>
                  <div className="h-2.5 w-28 bg-[#e0e3e5] rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-[#e0e3e5]/50 rounded" />
                  <div className="h-2 w-4/5 bg-[#e0e3e5]/50 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F8FAFC] py-20 border-y border-[#E2E8F0]">
        <div className="px-4 md:px-10 max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A]">
              Simple 4-Step Intelligence
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto mt-4">
              Integrate AI into your workflow in minutes, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-[#E2E8F0] z-10 relative">
                  <span className="material-symbols-outlined text-[#006b2c] text-4xl">upload_file</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-[1px] bg-[#E2E8F0] -z-0" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#0F172A] mb-2">1. Upload</h4>
                <p className="text-sm text-[#64748B]">Import CSV files or analyze live inquiries with zero server database footprint.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-[#E2E8F0] z-10 relative">
                  <span className="material-symbols-outlined text-[#006b2c] text-4xl">query_stats</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-[1px] bg-[#E2E8F0] -z-0" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#0F172A] mb-2">2. Analysis</h4>
                <p className="text-sm text-[#64748B]">Intelligent AI parses profiles and market data signals.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-[#E2E8F0] z-10 relative">
                  <span className="material-symbols-outlined text-[#006b2c] text-4xl">rule_folder</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-[1px] bg-[#E2E8F0] -z-0" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#0F172A] mb-2">3. View Score</h4>
                <p className="text-sm text-[#64748B]">Get ranked scores from 0-100 for every prospect.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#006b2c] text-4xl">contact_mail</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#0F172A] mb-2">4. Contact</h4>
                <p className="text-sm text-[#64748B]">Engage your highest potential leads instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 md:px-10 py-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="w-full aspect-square rounded-3xl shadow-2xl relative overflow-hidden bg-white p-2 border border-[#E2E8F0]">
            <img
              src="/team-collaboration-ai.svg"
              alt="AI Driven Team Collaboration & Revenue Acceleration"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] leading-tight">
              Why Choose AI-Driven Qualification?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-1">Unrivaled Time Saving</h4>
                  <p className="text-sm text-[#64748B]">Manual lead scrubbing takes hours. LeadIQ AI does it in seconds, freeing your team for high-value conversations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-1">Higher Conversion Rates</h4>
                  <p className="text-sm text-[#64748B]">Stop spreading your efforts thin. By focusing only on 'Ready to Buy' leads, conversion rates typically double.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-1">Explainable AI</h4>
                  <p className="text-sm text-[#64748B]">We don't just give you a number. Our AI explains exactly *why* a lead was scored high or low with bulleted insights.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                  <span className="material-symbols-outlined">stacks</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-1">Bulk Processing</h4>
                  <p className="text-sm text-[#64748B]">Process single inquiries or batch CSV files quickly with responsive client-side evaluation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-10 py-16 max-w-[1280px] mx-auto">
        <div className="primary-gradient rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Ready to transform your sales pipeline?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => onNavigate('analyzer')}
              className="bg-white text-[#006b2c] px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              Analyze Leads Now
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all cursor-pointer"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
