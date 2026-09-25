import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-12 px-4 md:px-10 bg-[#f2f4f6] border-t border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span
              className="material-symbols-outlined text-[#006b2c] text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
            <span className="font-bold text-lg text-[#191c1e]">LeadIQ AI</span>
          </div>
          <p className="text-sm text-[#64748B]">
            © 2026 LeadIQ AI. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors"
          >
            Project Info
          </button>
          <button
            onClick={() => onNavigate('scoring-logic')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors"
          >
            Documentation
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors"
          >
            Lead Analyzer
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors"
          >
            Dashboard
          </button>
        </nav>

        <div className="flex gap-3">
          <a
            href="#language"
            onClick={(e) => e.preventDefault()}
            className="w-9 h-9 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-white hover:text-[#006b2c] transition-all"
          >
            <span className="material-symbols-outlined text-lg">language</span>
          </a>
          <a
            href="#email"
            onClick={(e) => e.preventDefault()}
            className="w-9 h-9 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-white hover:text-[#006b2c] transition-all"
          >
            <span className="material-symbols-outlined text-lg">
              alternate_email
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
