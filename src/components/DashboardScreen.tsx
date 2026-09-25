import React, { useState } from 'react';
import { Lead, NavTab, LeadTier } from '../types';

interface DashboardScreenProps {
  leads: Lead[];
  onNavigate: (tab: NavTab) => void;
  onAddLead: (lead: Lead) => void;
  onResetLeads: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  leads,
  onNavigate,
  onResetLeads,
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead>(leads[0] || null);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesTier =
      filterTier === 'ALL' || lead.tier.toUpperCase() === filterTier.toUpperCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      lead.fullName.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.jobTitle.toLowerCase().includes(q) ||
      lead.industry.toLowerCase().includes(q) ||
      lead.requirements.toLowerCase().includes(q);
    return matchesTier && matchesSearch;
  });

  // Calculate KPIs
  const totalLeads = leads.length;
  const hotLeadsCount = leads.filter((l) => l.score >= 90 || l.tier === 'Hot').length;
  const warmLeadsCount = leads.filter((l) => (l.score >= 70 && l.score < 90) || l.tier === 'Warm').length;
  const coldLeadsCount = leads.filter((l) => l.score < 70 || l.tier === 'Cold' || l.tier === 'Very Low').length;
  const avgScore = totalLeads > 0 ? (leads.reduce((acc, l) => acc + l.score, 0) / totalLeads).toFixed(1) : '0';

  // Export handlers
  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = [
      'Rank',
      'Name',
      'Company',
      'Job Title',
      'Industry',
      'Score',
      'Tier',
      'Fit Score',
      'Intent',
      'Budget',
      'Requirements',
      'Next Recommended Action',
      'Summary'
    ];

    const rows = leads.map((l) => [
      l.rank,
      `"${l.fullName}"`,
      `"${l.company}"`,
      `"${l.jobTitle}"`,
      `"${l.industry}"`,
      l.score,
      l.tier,
      l.fitScore,
      l.intentScore,
      `"${l.budget}"`,
      `"${l.requirements.replace(/"/g, '""')}"`,
      `"${l.nextAction.replace(/"/g, '""')}"`,
      `"${l.summary.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LeadIQ_AI_Qualified_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `LeadIQ_AI_Leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-10 max-w-[1280px] mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Results Dashboard</h1>
          <p className="text-sm text-[#64748B]">
            Ranked B2B Sales Opportunities &amp; AI Qualification Insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('analyzer')}
            className="primary-gradient text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Qualify New Lead
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export CSV
          </button>

          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">code</span>
            Export JSON
          </button>

          <button
            onClick={onResetLeads}
            title="Reset to PRD benchmark dataset"
            className="px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Total Qualified Leads
            </span>
            <span className="p-2 bg-[#006b2c]/10 rounded-lg text-[#006b2c]">
              <span className="material-symbols-outlined text-lg">groups</span>
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">{totalLeads}</h3>
          <p className="text-xs font-semibold text-[#006b2c] mt-1">Real-time Session Queue</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Hot Leads (90–100)
            </span>
            <span className="p-2 bg-[#006b2c]/10 rounded-lg text-[#006b2c]">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">{hotLeadsCount}</h3>
          <p className="text-xs text-[#006b2c] font-bold mt-1">
            {totalLeads > 0 ? Math.round((hotLeadsCount / totalLeads) * 100) : 0}% High Intent Ratio
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Warm Leads (70–89)
            </span>
            <span className="p-2 bg-[#10B981]/10 rounded-lg text-[#10B981]">
              <span className="material-symbols-outlined text-lg">bolt</span>
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">{warmLeadsCount}</h3>
          <p className="text-xs text-[#64748B] mt-1">Nurture Opportunity</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Average AI Lead Score
            </span>
            <span className="p-2 bg-[#006b5f]/10 rounded-lg text-[#006b5f]">
              <span className="material-symbols-outlined text-lg">speed</span>
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F172A]">{avgScore}</h3>
          <p className="text-xs text-[#10B981] font-semibold mt-1">Quality Benchmark</p>
        </div>
      </div>

      {/* Main Grid: Ranked Queue Table (7 cols) + Detailed AI Inspection Sidebar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Ranked Opportunities</h3>
              <p className="text-xs text-[#64748B]">Automatically sorted by AI Lead Score (Highest → Lowest)</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-44">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-base text-[#94A3B8]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name/company..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E2E8F0] text-[#0F172A]"
                />
              </div>

              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#E2E8F0] bg-white font-bold text-[#0F172A]"
              >
                <option value="ALL">All Tiers</option>
                <option value="HOT">Hot (90-100)</option>
                <option value="WARM">Warm (70-89)</option>
                <option value="COLD">Cold (40-69)</option>
                <option value="VERY LOW">Very Low (&lt;40)</option>
              </select>
            </div>
          </div>

          {/* Table Rows */}
          <div className="overflow-x-auto">
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
                            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
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
                    <td colSpan={5} className="py-12 text-center text-xs text-[#64748B]">
                      No leads matching filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Detailed Explanation Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          {selectedLead ? (
            <div>
              <div className="flex justify-between items-start pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${selectedLead.avatarBg} ${selectedLead.avatarTextColor} flex items-center justify-center font-extrabold text-base`}
                  >
                    {selectedLead.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F172A]">{selectedLead.fullName}</h3>
                    <p className="text-xs text-[#64748B]">
                      {selectedLead.jobTitle} at <span className="font-bold text-[#0F172A]">{selectedLead.company}</span>
                    </p>
                    <p className="text-[11px] text-[#006b2c] font-medium">{selectedLead.email || `${selectedLead.fullName.toLowerCase().replace(' ', '.')}@${selectedLead.company.toLowerCase().replace(' ', '')}.com`}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Lead Score</span>
                  <span className="text-3xl font-extrabold text-[#006b2c]">{selectedLead.score}/100</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${selectedLead.score >= 90 || selectedLead.tier === 'Hot' ? 'bg-[#006b2c]/15 text-[#006b2c]' : selectedLead.score >= 70 || selectedLead.tier === 'Warm' ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#94A3B8]/15 text-[#64748B]'}`}>
                  TIER: {selectedLead.tier.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Business Fit: {selectedLead.fitScore}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#0F172A]">
                  Intent: {selectedLead.intentScore}
                </span>
              </div>

              {/* AI Summary */}
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-4">
                <span className="text-[11px] font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  AI Summary
                </span>
                <p className="text-xs text-[#0F172A] font-medium leading-relaxed">{selectedLead.summary}</p>
              </div>

              {/* Reasoning */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Key Evaluation Signals
                </span>
                <ul className="space-y-1.5">
                  {selectedLead.reasoning.map((reason, idx) => (
                    <li key={idx} className="text-xs text-[#0F172A] flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm text-[#006b2c] shrink-0 mt-0.5">check_circle</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Next Action */}
              <div className="p-4 bg-[#006b2c]/10 rounded-2xl border border-[#006b2c]/20 mb-5">
                <span className="text-[11px] font-bold text-[#006b2c] uppercase tracking-wider block mb-1">
                  Recommended Action
                </span>
                <p className="text-sm font-extrabold text-[#0F172A]">{selectedLead.nextAction}</p>
              </div>

              {/* 7-Factor Weight Distribution Breakdown */}
              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] space-y-2">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Factor Breakdown
                </span>

                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Buying Intent (25%)</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.buyingIntent}/25</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full" style={{ width: `${(selectedLead.factorBreakdown.buyingIntent / 25) * 100}%` }} />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Budget Availability (20%)</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.budgetAvailability}/20</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full" style={{ width: `${(selectedLead.factorBreakdown.budgetAvailability / 20) * 100}%` }} />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-[#64748B]">Decision Maker (15%)</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.factorBreakdown.decisionMaker}/15</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b5f] h-full" style={{ width: `${(selectedLead.factorBreakdown.decisionMaker / 15) * 100}%` }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#64748B]">
              Select a lead from the queue to inspect details.
            </div>
          )}

          {selectedLead && (
            <div className="pt-6 border-t border-[#E2E8F0] mt-6 flex gap-3">
              <button
                onClick={() => alert(`Contacting ${selectedLead.fullName} at ${selectedLead.company}...`)}
                className="flex-1 primary-gradient text-white py-3 rounded-xl font-bold text-xs shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                Execute Action ({selectedLead.nextAction})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
