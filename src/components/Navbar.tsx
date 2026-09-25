import React, { useState } from 'react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  leadsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, leadsCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f7f9fb]/90 backdrop-blur-md shadow-xs border-b border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex justify-between items-center">
        {/* Brand Zone */}
        <div
          className="flex items-center gap-2 cursor-pointer group select-none min-h-[44px]"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-9 h-9 rounded-xl bg-[#006b2c]/10 flex items-center justify-center text-[#006b2c] group-hover:scale-105 transition-transform">
            <span
              className="material-symbols-outlined text-2xl text-[#006b2c]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
          </div>
          <span className="font-extrabold text-xl md:text-2xl text-[#006b2c] tracking-tight">
            LeadIQ AI
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 py-1 ${
              activeTab === 'home'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Home
          </button>
          <button
            onClick={() => handleNavClick('analyzer')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer py-1 ${
              activeTab === 'analyzer'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Lead Analyzer
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 py-1 ${
              activeTab === 'dashboard'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Results Dashboard
            {leadsCount > 0 && (
              <span className="bg-[#006b2c]/10 text-[#006b2c] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {leadsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('scoring-logic')}
            className={`font-medium text-sm transition-colors duration-200 cursor-pointer py-1 ${
              activeTab === 'scoring-logic' || activeTab === 'about'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#64748B] hover:text-[#006b2c]'
            }`}
          >
            Scoring Logic
          </button>
        </nav>

        {/* Right Actions & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick('analyzer')}
            className="primary-gradient text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px]"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span className="hidden xs:inline">Qualify Lead</span>
            <span className="xs:hidden">Qualify</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0]/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] shadow-lg animate-in slide-in-from-top-2 duration-200 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'home'
                ? 'bg-[#006b2c]/10 text-[#006b2c]'
                : 'text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Home Overview
          </button>

          <button
            onClick={() => handleNavClick('analyzer')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'analyzer'
                ? 'bg-[#006b2c]/10 text-[#006b2c]'
                : 'text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">psychology</span>
            Lead Analyzer (Form, Email, CSV)
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#006b2c]/10 text-[#006b2c]'
                : 'text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">leaderboard</span>
              Results Dashboard
            </div>
            {leadsCount > 0 && (
              <span className="bg-[#006b2c] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {leadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('scoring-logic')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'scoring-logic' || activeTab === 'about'
                ? 'bg-[#006b2c]/10 text-[#006b2c]'
                : 'text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">verified</span>
            Scoring Methodology
          </button>

          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between px-2 text-xs text-[#64748B]">
            <a
              href="https://github.com/bikram73/LeadIQ_AI"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#006b2c] py-2"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              GitHub Repo
            </a>
            <a
              href="https://leadiq-ai.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#006b2c] py-2"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Live Netlify App
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
