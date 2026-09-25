import React from 'react';
import { NavTab } from '../types';

interface MobileBottomNavProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  leadsCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  leadsCount,
}) => {
  const tabs: Array<{
    id: NavTab;
    label: string;
    icon: string;
    badge?: number;
  }> = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
    },
    {
      id: 'analyzer',
      label: 'Analyzer',
      icon: 'psychology',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'leaderboard',
      badge: leadsCount > 0 ? leadsCount : undefined,
    },
    {
      id: 'scoring-logic',
      label: 'Logic & PRD',
      icon: 'verified',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden safe-area-pb"
    >
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.id ||
            (tab.id === 'scoring-logic' && activeTab === 'about');

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center h-full relative transition-all duration-200 cursor-pointer min-h-[48px] ${
                isActive ? 'text-[#006b2c]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-2xl transition-transform"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {tab.icon}
                </span>

                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#006b2c] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[16px] h-4 flex items-center justify-center shadow-xs">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-0.5 font-medium ${
                  isActive ? 'font-bold text-[#006b2c]' : 'text-[#64748B]'
                }`}
              >
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-[#006b2c] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
