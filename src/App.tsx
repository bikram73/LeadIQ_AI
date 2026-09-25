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
          // Exclude any temporary sample leads, only persist user-entered & analyzed leads
          const userOnlyLeads = parsed.filter((l: Lead) => !l.isSample);
          return rankLeads(userOnlyLeads);
        }
      }
    } catch {
      // Storage unavailable or invalid
    }
    // Initially empty - 0 leads until analyzed by user
    return [];
  });

  // Sync only user-entered/analyzed leads to localStorage (sample leads are session-only)
  useEffect(() => {
    try {
      const userOnlyLeads = leads.filter((l) => !l.isSample);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnlyLeads));
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
      // Check if duplicate ID exists, replace or append (ensuring isSample is not set for real user leads)
      const sanitizedLead: Lead = {
        ...newLead,
        isSample: false,
      };
      const filtered = prev.filter((l) => l.id !== sanitizedLead.id);
      return rankLeads([sanitizedLead, ...filtered]);
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
    // Tag sample leads with isSample: true so they only show in active session and clear on refresh
    const sampleLeadsWithFlag: Lead[] = SAMPLE_PRD_LEADS.map((l) => ({
      ...l,
      isSample: true,
    }));

    setLeads((prev) => {
      // Filter out any previous sample leads and append fresh sample leads alongside user's own leads
      const userLeads = prev.filter((l) => !l.isSample);
      return rankLeads([...userLeads, ...sampleLeadsWithFlag]);
    });
  };

  const handleRemoveSampleLeads = () => {
    setLeads((prev) => rankLeads(prev.filter((l) => !l.isSample)));
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
            onRemoveSampleLeads={handleRemoveSampleLeads}
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
