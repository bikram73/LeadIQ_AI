import React, { useState, useEffect } from 'react';
import { Lead, NavTab } from '../types';
import { serializeLeadsToCsv } from '../utils/csvParser';

interface DashboardScreenProps {
  leads: Lead[];
  onNavigate: (tab: NavTab) => void;
  onAddLead: (lead: Lead) => void;
  onResetLeads: () => void;
  onLoadDemoLeads?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  leads,
  onNavigate,
  onResetLeads,
  onLoadDemoLeads,
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'highest' | 'lowest'>('highest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileDetailOpen, setMobileDetailOpen] = useState<boolean>(false);

  // Keep selectedLead synchronized with leads list
  useEffect(() => {
    if (leads.length === 0) {
      setSelectedLead(null);
      setMobileDetailOpen(false);
    } else if (!selectedLead || !leads.some((l) => l.id === selectedLead.id)) {
      setSelectedLead(leads[0]);
    }
  }, [leads, selectedLead]);

  // Filter & sort leads
  const filteredLeads = leads
    .filter((lead) => {
      const matchesTier =
        filterTier === 'ALL' ||
        lead.tier.toUpperCase() === filterTier.toUpperCase() ||
        (filterTier === 'COLD' && (lead.tier === 'Cold' || lead.tier === 'Very Low'));
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.jobTitle.toLowerCase().includes(q) ||
        lead.industry.toLowerCase().includes(q) ||
        lead.requirements.toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'lowest') return a.score - b.score;
      return b.score - a.score;
    });

  // Calculate KPIs
  const totalLeads = leads.length;
  const hotLeadsCount = leads.filter((l) => l.score >= 90 || l.tier === 'Hot').length;
  const warmLeadsCount = leads.filter((l) => (l.score >= 70 && l.score < 90) || l.tier === 'Warm').length;
  const coldLeadsCount = leads.filter((l) => l.score < 70 || l.tier === 'Cold' || l.tier === 'Very Low').length;
  const avgScore = totalLeads > 0 ? (leads.reduce((acc, l) => acc + l.score, 0) / totalLeads).toFixed(1) : '0';

  const handleSelectLeadOnMobile = (lead: Lead) => {
    setSelectedLead(lead);
    setMobileDetailOpen(true);
  };

  // Export handlers
  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const csvData = serializeLeadsToCsv(leads);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `LeadIQ_AI_Qualified_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    if (leads.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `LeadIQ_AI_Leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportPdf = () => {
    if (leads.length === 0) return;
    window.print();
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 px-3 sm:px-6 md:px-10 max-w-[1280px] mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-xl text-[#006b2c]">
              leaderboard
            </span>
            <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              Lead Intelligence Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Results Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Ranked B2B Sales Opportunities &amp; AI Qualification Insights.
          </p>
        </div>

        {/* Action Button Row with Horizontal Scroll for Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => onNavigate('analyzer')}
            className="primary-gradient text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Qualify Lead
          </button>

          {onLoadDemoLeads && (
            <button
              onClick={onLoadDemoLeads}
              title="Load 5 PRD Benchmark Sample Leads"
              className="px-3 sm:px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#006b2c] hover:bg-[#006b2c]/5 shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
            >
              <span className="material-symbols-outlined text-base">science</span>
              Sample Leads
            </button>
          )}

          <button
            onClick={handleExportCsv}
            disabled={leads.length === 0}
            className={`px-3 py-2.5 bg-white border rounded-xl text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 min-h-[42px] ${
              leads.length === 0
                ? 'opacity-40 cursor-not-allowed border-[#E2E8F0] text-[#94A3B8]'
                : 'border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] shadow-xs cursor-pointer'
            }`}
          >
            <span className="material-symbols-outlined text-base">download</span>
            CSV
          </button>

          <button
            onClick={handleExportJson}
            disabled={leads.length === 0}
            className={`px-3 py-2.5 bg-white border rounded-xl text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 min-h-[42px] ${
              leads.length === 0
                ? 'opacity-40 cursor-not-allowed border-[#E2E8F0] text-[#94A3B8]'
                : 'border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] shadow-xs cursor-pointer'
            }`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            JSON
          </button>

          <button
            onClick={handleExportPdf}
            disabled={leads.length === 0}
            className={`px-3 py-2.5 bg-white border rounded-xl text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 min-h-[42px] ${
              leads.length === 0
                ? 'opacity-40 cursor-not-allowed border-[#E2E8F0] text-[#94A3B8]'
                : 'border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] shadow-xs cursor-pointer'
            }`}
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            PDF
          </button>

          {leads.length > 0 && (
            <button
              onClick={onResetLeads}
              title="Clear all stored session leads (Reset to 0)"
              className="px-3 py-2.5 bg-white border border-[#FCA5A5] text-[#DC2626] rounded-xl text-xs font-semibold hover:bg-[#FEF2F2] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
            >
              <span className="material-symbols-outlined text-base">delete_sweep</span>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats Grid (2x2 on mobile, 4x1 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#006b2c]/30 transition-all">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Total Qualified
            </span>
            <span className="p-1.5 sm:p-2 bg-[#006b2c]/10 rounded-lg text-[#006b2c]">
              <span className="material-symbols-outlined text-base sm:text-lg">groups</span>
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{totalLeads}</h3>
          <p className="text-[11px] sm:text-xs font-semibold text-[#006b2c] mt-0.5 truncate">
            {totalLeads > 0 ? 'Active in Session' : 'Queue Empty'}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#006b2c]/30 transition-all">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Hot Leads (90–100)
            </span>
            <span className="p-1.5 sm:p-2 bg-[#006b2c]/10 rounded-lg text-[#006b2c]">
              <span className="material-symbols-outlined text-base sm:text-lg">local_fire_department</span>
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{hotLeadsCount}</h3>
          <p className="text-[11px] sm:text-xs text-[#006b2c] font-bold mt-0.5 truncate">
            {totalLeads > 0 ? `${Math.round((hotLeadsCount / totalLeads) * 100)}% High Intent` : '0% High Intent'}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#10B981]/30 transition-all">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Warm Leads (70–89)
            </span>
            <span className="p-1.5 sm:p-2 bg-[#10B981]/10 rounded-lg text-[#10B981]">
              <span className="material-symbols-outlined text-base sm:text-lg">bolt</span>
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{warmLeadsCount}</h3>
          <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 truncate">
            {totalLeads > 0 ? `${Math.round((warmLeadsCount / totalLeads) * 100)}% Nurture` : 'Nurture Pipeline'}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#006b5f]/30 transition-all">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Average AI Score
            </span>
            <span className="p-1.5 sm:p-2 bg-[#006b5f]/10 rounded-lg text-[#006b5f]">
              <span className="material-symbols-outlined text-base sm:text-lg">speed</span>
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{avgScore}</h3>
          <p className="text-[11px] sm:text-xs text-[#10B981] font-semibold mt-0.5 truncate">
            {totalLeads > 0 ? '7-Factor Avg' : '0 Benchmark'}
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Table & Mobile Card List Area (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          {/* Table / List Toolbar */}
          <div className="p-4 sm:p-6 border-b border-[#E2E8F0] flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">Ranked Opportunities</h3>
                <p className="text-[11px] sm:text-xs text-[#64748B]">Sorted deterministically by AI Lead Score</p>
              </div>
              <span className="text-xs font-bold bg-[#F1F5F9] text-[#0F172A] px-2.5 py-1 rounded-full">
                {filteredLeads.length} {filteredLeads.length === 1 ? 'Lead' : 'Leads'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-[#94A3B8]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name/company..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#006b2c]"
                />
              </div>

              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-white font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#006b2c]"
                title="Filter by Qualification Tier"
              >
                <option value="ALL">All Tiers</option>
                <option value="HOT">Hot (90–100)</option>
                <option value="WARM">Warm (70–89)</option>
                <option value="COLD">Cold (0–69)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'highest' | 'lowest')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-white font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#006b2c]"
                title="Sort Opportunities"
              >
                <option value="highest">Score: High → Low</option>
                <option value="lowest">Score: Low → High</option>
              </select>
            </div>
          </div>

          {/* MOBILE VIEW: Touch Card List (visible on sm/xs screens) */}
          <div className="block md:hidden divide-y divide-[#E2E8F0]">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead && selectedLead.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => handleSelectLeadOnMobile(lead)}
                    className={`p-4 transition-colors active:bg-[#006b2c]/10 cursor-pointer ${
                      isSelected ? 'bg-[#006b2c]/5 border-l-4 border-[#006b2c]' : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-full ${lead.avatarBg} ${lead.avatarTextColor} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                        >
                          {lead.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold text-[#64748B]">#{lead.rank}</span>
                            <h4 className="text-xs font-bold text-[#0F172A] truncate">{lead.fullName}</h4>
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">
                            {lead.jobTitle || 'Contact'} · <span className="font-semibold text-[#0F172A]">{lead.company}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-base font-extrabold text-[#006b2c]">{lead.score}</span>
                          <span className="text-[10px] text-[#64748B]">/100</span>
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                            lead.score >= 90 || lead.tier === 'Hot'
                              ? 'bg-[#006b2c]/15 text-[#006b2c]'
                              : lead.score >= 70 || lead.tier === 'Warm'
                              ? 'bg-[#10B981]/15 text-[#10B981]'
                              : 'bg-[#94A3B8]/15 text-[#64748B]'
                          }`}
                        >
                          {lead.tier}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#64748B] pt-2 border-t border-[#F1F5F9]">
                      <span className="truncate max-w-[200px]">{lead.requirements}</span>
                      <span className="text-[#006b2c] font-bold flex items-center gap-0.5 shrink-0">
                        Inspect
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-[#006b2c]/10 text-[#006b2c] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-2xl">leaderboard</span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">
                  {leads.length === 0 ? 'No Qualified Leads Yet' : 'No Matching Leads'}
                </h4>
                <p className="text-xs text-[#64748B] mb-4">
                  {leads.length === 0
                    ? 'Qualify your first lead to see real-time AI scoring and ranking.'
                    : 'Try clearing your search query or adjusting the tier filter.'}
                </p>
                {leads.length === 0 && (
                  <button
                    onClick={() => onNavigate('analyzer')}
                    className="primary-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                  >
                    Qualify First Lead
                  </button>
                )}
              </div>
            )}
          </div>

          {/* DESKTOP VIEW: Data Table (visible on md/lg screens) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold uppercase text-[#64748B] tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Prospect / Company</th>
                  <th className="py-3 px-4">AI Score</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead && selectedLead.id === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#006b2c]/5' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-xs font-extrabold text-[#64748B]">
                          #{lead.rank}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${lead.avatarBg} ${lead.avatarTextColor} flex items-center justify-center font-bold text-xs shrink-0`}
                            >
                              {lead.avatarInitials}
                            </div>
                            <div>
                              <p className="text-xs font-extrabold text-[#0F172A] leading-tight">
                                {lead.fullName}
                              </p>
                              <p className="text-[11px] text-[#64748B]">
                                {lead.jobTitle} • <span className="font-semibold text-[#0F172A]">{lead.company}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-[#0F172A]">{lead.score}</span>
                            <span className="text-[10px] text-[#64748B]">/100</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.score >= 90 || lead.tier === 'Hot'
                                ? 'bg-[#006b2c]/15 text-[#006b2c]'
                                : lead.score >= 70 || lead.tier === 'Warm'
                                ? 'bg-[#10B981]/15 text-[#10B981]'
                                : 'bg-[#94A3B8]/15 text-[#64748B]'
                            }`}
                          >
                            {lead.tier}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#006b2c] text-white border-[#006b2c]'
                                : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                            }`}
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="max-w-md mx-auto flex flex-col items-center">
                        <div className="w-14 h-14 bg-[#006b2c]/10 text-[#006b2c] rounded-2xl flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-2xl">leaderboard</span>
                        </div>
                        <h4 className="text-base font-bold text-[#0F172A] mb-1">
                          {leads.length === 0 ? 'No Qualified Leads Yet' : 'No Matching Leads'}
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                          {leads.length === 0
                            ? 'Your qualification queue is initially empty (0). Analyze an inbound lead via manual form, raw email, or CSV import to view live scoring.'
                            : 'Try adjusting your tier filter or search keywords.'}
                        </p>
                        {leads.length === 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                              onClick={() => onNavigate('analyzer')}
                              className="primary-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">psychology</span>
                              Qualify First Lead
                            </button>
                            {onLoadDemoLeads && (
                              <button
                                onClick={onLoadDemoLeads}
                                className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#006b2c] rounded-xl text-xs font-bold hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              >
                                Load Sample Leads
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Detailed Explanation Panel (5 cols desktop, sticky or modal on mobile) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          {selectedLead ? (
            <div>
              <div className="flex justify-between items-start pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${selectedLead.avatarBg} ${selectedLead.avatarTextColor} flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0`}
                  >
                    {selectedLead.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] truncate">
                      {selectedLead.fullName}
                    </h3>
                    <p className="text-xs text-[#64748B] truncate">
                      {selectedLead.jobTitle} at <span className="font-bold text-[#0F172A]">{selectedLead.company}</span>
                    </p>
                    <p className="text-[11px] text-[#006b2c] font-medium truncate">
                      {selectedLead.email || `${selectedLead.fullName.toLowerCase().replace(/\s+/g, '.')}@${selectedLead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Lead Score</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#006b2c]">{selectedLead.score}/100</span>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-extrabold ${selectedLead.score >= 90 || selectedLead.tier === 'Hot' ? 'bg-[#006b2c]/15 text-[#006b2c]' : selectedLead.score >= 70 || selectedLead.tier === 'Warm' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                  TIER: {selectedLead.tier.toUpperCase()}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Business Fit: {selectedLead.fitScore}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Intent: {selectedLead.intentScore}
                </span>
              </div>

              {/* Lead Summary */}
              <div className="p-3.5 sm:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-4">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  AI Qualification Summary
                </span>
                <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                  {selectedLead.summary}
                </p>
              </div>

              {/* Reasoning */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Qualification Reasoning
                </span>
                <ul className="space-y-1.5">
                  {selectedLead.reasoning.map((r, idx) => (
                    <li key={idx} className="text-xs text-[#0F172A] flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-[#006b2c] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Action Box */}
              <div className="p-3.5 sm:p-4 bg-[#006b2c]/10 rounded-2xl border border-[#006b2c]/20 mb-5">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  Recommended Action
                </span>
                <p className="text-sm font-extrabold text-[#0F172A]">{selectedLead.nextAction}</p>
              </div>

              {/* 7-Factor Progress Bars */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  7-Factor Deterministic Breakdown
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Buying Intent (25 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.buyingIntent}/25</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b2c] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.buyingIntent / 25) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Budget Availability (20 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.budgetAvailability}/20</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.budgetAvailability / 20) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Decision Maker Authority (15 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.decisionMaker}/15</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b5f] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.decisionMaker / 15) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Timeline &amp; Urgency (15 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.timelineUrgency}/15</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#EAB308] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.timelineUrgency / 15) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Company Size Fit (10 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.companySize}/10</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#64748B] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.companySize / 10) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Industry Fit (10 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.industryFit}/10</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#64748B] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.industryFit / 10) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Requirement Clarity (5 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.requirementClarity}/5</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#64748B] h-full rounded-full" style={{ width: `${(selectedLead.factorBreakdown.requirementClarity / 5) * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#E2E8F0] mt-5">
                <button
                  onClick={() => alert(`Triggering next action: "${selectedLead.nextAction}" for ${selectedLead.fullName} at ${selectedLead.company}`)}
                  className="w-full primary-gradient text-white py-3 rounded-xl font-bold text-xs shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer min-h-[44px]"
                >
                  Execute Action ({selectedLead.nextAction})
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8] rounded-2xl flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">insights</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">No Lead Selected</h4>
              <p className="text-xs text-[#64748B] max-w-xs leading-relaxed mb-4">
                {leads.length === 0
                  ? 'Qualify your first lead to view deterministic 7-factor evaluation breakdown and sales actions.'
                  : 'Tap any lead in the list to inspect its 7-factor evaluation details.'}
              </p>
              {leads.length === 0 && (
                <button
                  onClick={() => onNavigate('analyzer')}
                  className="px-4 py-2 primary-gradient text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  Start Lead Qualification
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SLIDE-UP MODAL / BOTTOM SHEET FOR LEAD INSPECTION */}
      {mobileDetailOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end md:hidden animate-in fade-in duration-200">
          <div
            className="bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl flex flex-col safe-area-pb animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0" />

            <div className="flex justify-between items-start pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl ${selectedLead.avatarBg} ${selectedLead.avatarTextColor} flex items-center justify-center font-extrabold text-sm`}
                >
                  {selectedLead.avatarInitials}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">{selectedLead.fullName}</h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedLead.jobTitle} • <span className="font-bold text-[#0F172A]">{selectedLead.company}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileDetailOpen(false)}
                className="p-1.5 rounded-full text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
                aria-label="Close details"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Score & Tier Header */}
              <div className="flex items-center justify-between p-3.5 bg-[#006b2c]/10 rounded-2xl border border-[#006b2c]/20">
                <div>
                  <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-wider block">
                    AI Lead Score
                  </span>
                  <span className="text-3xl font-extrabold text-[#006b2c]">{selectedLead.score}/100</span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#006b2c] text-white">
                    {selectedLead.tier.toUpperCase()} TIER
                  </span>
                  <p className="text-[11px] text-[#64748B] font-semibold mt-1">
                    Fit: {selectedLead.fitScore} · Intent: {selectedLead.intentScore}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  AI Summary
                </span>
                <p className="text-xs text-[#0F172A] leading-relaxed">{selectedLead.summary}</p>
              </div>

              {/* Reasoning */}
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Qualification Reasoning
                </span>
                <ul className="space-y-1.5">
                  {selectedLead.reasoning.map((r, idx) => (
                    <li key={idx} className="text-xs text-[#0F172A] flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-[#006b2c] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 7-Factor Breakdown */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  7-Factor Deterministic Breakdown
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Buying Intent (25 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.buyingIntent}/25</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b2c] h-full" style={{ width: `${(selectedLead.factorBreakdown.buyingIntent / 25) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Budget Availability (20 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.budgetAvailability}/20</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full" style={{ width: `${(selectedLead.factorBreakdown.budgetAvailability / 20) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[#64748B]">
                    <span>Decision Authority (15 max)</span>
                    <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.decisionMaker}/15</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#006b5f] h-full" style={{ width: `${(selectedLead.factorBreakdown.decisionMaker / 15) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Next Action CTA */}
              <button
                onClick={() => {
                  setMobileDetailOpen(false);
                  alert(`Executing action: ${selectedLead.nextAction}`);
                }}
                className="w-full primary-gradient text-white py-3.5 rounded-xl font-bold text-xs shadow-md active:scale-98 transition-transform cursor-pointer"
              >
                Execute: {selectedLead.nextAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
