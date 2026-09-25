import React from 'react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <span
            className="material-symbols-outlined text-[#006b2c] text-3xl group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            analytics
          </span>
          <span className="font-bold text-xl md:text-2xl text-[#006b2c]">
            LeadIQ AI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] pb-1 font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === 'analyzer'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] pb-1 font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Lead Analyzer
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] pb-1 font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Results Dashboard
          </button>
          <button
            onClick={() => onNavigate('scoring-logic')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === 'scoring-logic' || activeTab === 'about'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] pb-1 font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Scoring Logic & About
          </button>
        </nav>

        <button
          onClick={() => onNavigate('analyzer')}
          className="primary-gradient text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md active:scale-95 hover:opacity-90 transition-all cursor-pointer"
        >
          Analyze Leads
        </button>
      </div>
    </header>
  );
};
