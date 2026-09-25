import React, { useState } from 'react';
import { NavTab } from '../types';
import { SAMPLE_PRD_LEADS } from '../data/sampleLeads';

interface ScoringLogicScreenProps {
  onNavigate: (tab: NavTab) => void;
}

export const ScoringLogicScreen: React.FC<ScoringLogicScreenProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Gemini 3.8 Flash score lead intent & budget?',
      a: 'Gemini 3.8 Flash analyzes natural language inputs from contact forms and email text. It evaluates explicit budget figures, implementation timelines, and executive title authority against standard B2B qualification frameworks.',
    },
    {
      q: 'What are the exact weight distributions?',
      a: 'The scoring model evaluates 7 key factors: Buying Intent (25%), Budget Availability (20%), Decision Maker Involvement (15%), Timeline / Urgency (15%), Company Size (10%), Industry Fit (10%), and Requirement Clarity (5%).',
    },
    {
      q: 'Why use Google Gemini AI over static IF/THEN rules?',
      a: 'Traditional rules fail when job titles vary (e.g., "Founder" vs "Head of Innovation") or when budget is phrased naturally ("Approved $80k for Q3"). Gemini reasoning understands context, sentiment, and nuance that rigid rules miss.',
    },
    {
      q: 'Is prospect data stored or used for model training?',
      a: 'No. All lead inputs are processed via server-side Gemini API calls. Data is encrypted in transit and never persisted to public databases or used for foundational model training.',
    },
  ];

  return (
    <div className="pt-24 pb-16 px-4 md:px-10 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#006b2c]/10 text-[#006b2c] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-base">psychology</span>
          Gemini AI Architecture
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
          Scoring Methodology &amp; Weight Distribution
        </h1>
        <p className="text-base text-[#64748B] leading-relaxed">
          Transparent breakdown of how LeadIQ AI leverages Google Gemini 3.8 Flash to qualify, score, and rank inbound sales leads.
        </p>
      </div>

      {/* 7 Weight Distribution Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-extrabold text-[#0F172A] mb-6 text-center">
          7 Weighted Evaluation Factors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#006b2c]/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center font-extrabold text-xs">
                25%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 1</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Buying Intent</h3>
            <p className="text-xs text-[#64748B]">
              Detects explicit purchase signals, demo requests, and urgency phrased in communications.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#10B981]/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-extrabold text-xs">
                20%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 2</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Budget Availability</h3>
            <p className="text-xs text-[#64748B]">
              Evaluates stated or implied budget ranges against enterprise solution tier pricing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#006b5f]/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#006b5f]/10 text-[#006b5f] flex items-center justify-center font-extrabold text-xs">
                15%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 3</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Decision Maker Role</h3>
            <p className="text-xs text-[#64748B]">
              Analyzes C-Level, VP, or Director title purchasing authority and decision capacity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAB308]/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#EAB308]/10 text-[#B45309] flex items-center justify-center font-extrabold text-xs">
                15%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 4</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Timeline &amp; Urgency</h3>
            <p className="text-xs text-[#64748B]">
              Evaluates implementation speed (e.g. "within 2 weeks" vs "exploring for next year").
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                10%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 5</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Company Size</h3>
            <p className="text-xs text-[#64748B]">
              Scales score based on enterprise employee headcount and organizational capacity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                10%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 6</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Industry Fit</h3>
            <p className="text-xs text-[#64748B]">
              Compares prospect vertical (Software, Retail, Healthcare) with target solution ICP.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm sm:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                5%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 7</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Requirement Clarity</h3>
            <p className="text-xs text-[#64748B]">
              Rewards detailed technical specifications over vague exploratory inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Gemini Code Engine Window */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 md:p-8 shadow-2xl mb-12 border border-[#1E293B]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-xs font-mono text-[#94A3B8] ml-2">server.ts • Gemini 3.8 Flash API</span>
          </div>
          <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            @google/genai SDK
          </span>
        </div>

        <pre className="font-mono text-xs md:text-sm overflow-x-auto text-[#E2E8F0] leading-relaxed p-2">
          <code>
{`const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }, { text: leadPrompt }] }
  ],
  config: {
    responseMimeType: 'application/json'
  }
});`}
          </code>
        </pre>
      </div>

      {/* Benchmark Dataset Table */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm mb-12">
        <h2 className="text-xl font-bold text-[#0F172A] mb-2 text-center">
          Benchmark Qualification Results Matrix
        </h2>
        <p className="text-xs text-[#64748B] text-center mb-6">
          Pre-evaluated test suite of standard B2B prospect profiles and expected AI outputs
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase">
                <th className="py-3 px-3">Lead</th>
                <th className="py-3 px-3">Company &amp; Industry</th>
                <th className="py-3 px-3">Budget</th>
                <th className="py-3 px-3">AI Score</th>
                <th className="py-3 px-3">Tier</th>
                <th className="py-3 px-3">Recommended Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {SAMPLE_PRD_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-3 font-bold text-[#0F172A]">
                    {lead.fullName} <span className="block text-[10px] text-[#64748B] font-normal">{lead.jobTitle}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#0F172A]">{lead.company}</span>
                    <span className="block text-[10px] text-[#64748B]">{lead.industry}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#0F172A]">{lead.budget}</td>
                  <td className="py-3 px-3 font-extrabold text-[#006b2c]">{lead.score}/100</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${lead.score >= 90 ? 'bg-[#006b2c]/15 text-[#006b2c]' : lead.score >= 70 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                      {lead.tier}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#0F172A]">{lead.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-lg text-[#006b2c]">
                    {isOpen ? 'remove' : 'add'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
