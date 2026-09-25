import React, { useState, useEffect } from 'react';
import { NavTab, Lead } from './types';
import { SAMPLE_PRD_LEADS } from './data/sampleLeads';
import { rankLeads } from './services/scoringEngine';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { LeadAnalyzerScreen } from './components/LeadAnalyzerScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ScoringLogicScreen } from './components/ScoringLogicScreen';

const STORAGE_KEY = 'leadiq_ai_leads_store_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return rankLeads(parsed);
        }
      }
    } catch {
      // Storage unavailable or invalid
    }
    // Initially empty - 0 leads until analyzed by user
    return [];
  });

  // Sync to localStorage whenever leads change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Failed to save leads to localStorage', e);
    }
  }, [leads]);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => {
      // Check if duplicate ID exists, replace or append
      const filtered = prev.filter((l) => l.id !== newLead.id);
      return rankLeads([newLead, ...filtered]);
    });
  };

  const handleAddMultipleLeads = (newLeads: Lead[]) => {
    setLeads((prev) => {
      return rankLeads([...newLeads, ...prev]);
    });
  };

  const handleClearLeads = () => {
    setLeads([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleLoadDemoLeads = () => {
    setLeads(rankLeads(SAMPLE_PRD_LEADS));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans antialiased selection:bg-[#006b2c]/20 selection:text-[#006b2c]">
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        leadsCount={leads.length}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && <HomeScreen onNavigate={handleNavigate} />}

        {activeTab === 'analyzer' && (
          <LeadAnalyzerScreen
            onNavigate={handleNavigate}
            onAddLead={handleAddLead}
            onAddMultipleLeads={handleAddMultipleLeads}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardScreen
            leads={leads}
            onNavigate={handleNavigate}
            onAddLead={handleAddLead}
            onResetLeads={handleClearLeads}
            onLoadDemoLeads={handleLoadDemoLeads}
          />
        )}

        {(activeTab === 'scoring-logic' || activeTab === 'about') && (
          <ScoringLogicScreen onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Touch-Optimized Mobile Bottom Tab Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        leadsCount={leads.length}
      />
    </div>
  );
}
