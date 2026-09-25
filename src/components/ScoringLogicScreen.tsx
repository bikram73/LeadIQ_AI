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
      q: 'How does the AI engine score lead intent & budget?',
      a: 'The AI engine extracts natural language signals from contact forms and email inquiries. It evaluates explicit budget figures, implementation timelines, and executive title authority against standard B2B qualification frameworks without ever fabricating unstated claims.',
    },
    {
      q: 'What are the exact weight distributions?',
      a: 'The scoring model deterministically evaluates 7 factors totaling 100 points: Buying Intent (25 max), Budget Availability (20 max), Decision Maker Authority (15 max), Timeline / Urgency (15 max), Company Size (10 max), Industry Fit (10 max), and Requirement Clarity (5 max).',
    },
    {
      q: 'Why use AI reasoning combined with deterministic scoring?',
      a: 'LLMs excel at qualitative evidence extraction (understanding nuanced titles and natural budget phrasing). Our deterministic engine then calculates the final score and tier from the factor breakdown to eliminate hallucinated totals and ensure 100% mathematical consistency.',
    },
    {
      q: 'Is prospect data stored or used for model training?',
      a: 'No. Leads are evaluated server-side with zero remote database persistence. Session queue data is stored exclusively in your local browser storage and can be wiped anytime with 1-click.',
    },
  ];

  return (
    <div className="pt-20 md:pt-24 pb-16 px-3 sm:px-6 md:px-10 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#006b2c]/10 text-[#006b2c] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-base">psychology</span>
          LeadIQ AI Architecture
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3 tracking-tight text-balance">
          Scoring Methodology &amp; Weight Distribution
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed text-balance">
          Transparent breakdown of how LeadIQ AI qualifies, scores, and ranks inbound B2B leads.
        </p>
      </div>

      {/* 7 Weight Distribution Grid */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-4 sm:mb-6 text-center">
          7 Weighted Evaluation Factors (100 pts max)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#006b2c]/30 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center font-extrabold text-xs">
                25%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 1</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Buying Intent</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Detects explicit purchase signals, demo requests, and urgency phrased in communications.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#10B981]/30 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-extrabold text-xs">
                20%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 2</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Budget Availability</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Evaluates stated or implied budget ranges against enterprise solution tier pricing.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#006b5f]/30 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#006b5f]/10 text-[#006b5f] flex items-center justify-center font-extrabold text-xs">
                15%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 3</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Decision Maker Role</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Analyzes C-Level, VP, or Director title purchasing authority and decision capacity.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAB308]/30 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#EAB308]/10 text-[#B45309] flex items-center justify-center font-extrabold text-xs">
                15%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 4</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Timeline &amp; Urgency</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Evaluates implementation speed (e.g. "within 2 weeks" vs "exploring for next year").
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                10%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 5</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Company Size</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Scales score based on enterprise employee headcount and organizational capacity.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                10%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 6</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Industry Fit</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Compares prospect vertical with target enterprise solution ICP.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs sm:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-extrabold text-xs">
                5%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Factor 7</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">Requirement Clarity</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Rewards detailed technical specifications over vague exploratory inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Benchmark Dataset Table (Responsive wrapper) */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1 text-center">
          Benchmark Qualification Matrix
        </h2>
        <p className="text-xs text-[#64748B] text-center mb-4 sm:mb-6">
          Pre-evaluated reference dataset demonstrating deterministic scoring results
        </p>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse text-xs min-w-[540px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase">
                <th className="py-2.5 px-3">Lead</th>
                <th className="py-2.5 px-3">Company</th>
                <th className="py-2.5 px-3">Budget</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Tier</th>
                <th className="py-2.5 px-3">Next Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {SAMPLE_PRD_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-2.5 px-3 font-bold text-[#0F172A]">
                    {lead.fullName} <span className="block text-[10px] text-[#64748B] font-normal">{lead.jobTitle}</span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#0F172A]">{lead.company}</td>
                  <td className="py-2.5 px-3 font-medium text-[#0F172A]">{lead.budget}</td>
                  <td className="py-2.5 px-3 font-extrabold text-[#006b2c]">{lead.score}/100</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${lead.score >= 90 ? 'bg-[#006b2c]/15 text-[#006b2c]' : lead.score >= 70 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                      {lead.tier}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-[#0F172A] truncate max-w-[140px]">{lead.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm max-w-3xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-4 sm:mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-[#E2E8F0] rounded-xl sm:rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-3.5 sm:p-4 text-left flex justify-between items-center font-bold text-xs sm:text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer min-h-[48px]"
                >
                  <span className="pr-2">{faq.q}</span>
                  <span className="material-symbols-outlined text-lg text-[#006b2c] shrink-0">
                    {isOpen ? 'remove' : 'add'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-2.5">
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
