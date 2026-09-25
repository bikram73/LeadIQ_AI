import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full pt-10 pb-24 md:pb-12 px-4 sm:px-6 md:px-10 bg-[#f2f4f6] border-t border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div
            className="flex items-center gap-2 cursor-pointer group select-none min-h-[44px]"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c] group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                analytics
              </span>
            </div>
            <span className="font-extrabold text-lg text-[#191c1e] tracking-tight">LeadIQ AI</span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            © 2026 LeadIQ AI. All rights reserved. Zero remote DB dependency.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors py-2 px-1 cursor-pointer min-h-[40px] flex items-center"
          >
            Home Overview
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors py-2 px-1 cursor-pointer min-h-[40px] flex items-center"
          >
            Lead Analyzer
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors py-2 px-1 cursor-pointer min-h-[40px] flex items-center"
          >
            Results Dashboard
          </button>
          <button
            onClick={() => onNavigate('scoring-logic')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#006b2c] transition-colors py-2 px-1 cursor-pointer min-h-[40px] flex items-center"
          >
            Scoring Logic
          </button>
        </nav>
      </div>
    </footer>
  );
};
