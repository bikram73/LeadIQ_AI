import React, { useState } from 'react';
import { NavTab, Lead } from './types';
import { SAMPLE_PRD_LEADS } from './data/sampleLeads';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { LeadAnalyzerScreen } from './components/LeadAnalyzerScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ScoringLogicScreen } from './components/ScoringLogicScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_PRD_LEADS);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reRankLeads = (leadList: Lead[]): Lead[] => {
    // Sort descending by score
    const sorted = [...leadList].sort((a, b) => b.score - a.score);
    return sorted.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  };

  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => {
      // Check if duplicate ID exists, replace or append
      const filtered = prev.filter((l) => l.id !== newLead.id);
      return reRankLeads([newLead, ...filtered]);
    });
  };

  const handleAddMultipleLeads = (newLeads: Lead[]) => {
    setLeads((prev) => {
      return reRankLeads([...newLeads, ...prev]);
    });
  };

  const handleResetLeads = () => {
    setLeads(SAMPLE_PRD_LEADS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans">
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      <main className="flex-1">
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
            onResetLeads={handleResetLeads}
          />
        )}

        {(activeTab === 'scoring-logic' || activeTab === 'about') && (
          <ScoringLogicScreen onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
