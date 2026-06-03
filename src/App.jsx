import { useState, useRef } from 'react';
import './index.css';
import Header from './components/Header';
import Filters from './components/Filters';
import KPICard from './components/KPICard';
import { TurnoverChart, HeadcountChart, SatisfactionChart } from './components/Charts';
import { KPI_CONFIGS, getFilteredData } from './data/sampleData';
import InfoTooltip from './components/InfoTooltip';

const s = {
  app: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#080c14' },
  main: { flex: 1, padding: '24px 32px 40px', maxWidth: 1600, margin: '0 auto', width: '100%' },
  sectionLabel: {
    fontSize: 11, fontWeight: 700, color: '#475569',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
  },
  sectionLine: { flex: 1, height: 1, background: 'rgba(148,163,184,0.07)' },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 14,
    marginBottom: 24,
  },
  chartsRow1: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 14,
    marginBottom: 14,
  },
  chartCard: {
    background: 'linear-gradient(145deg, #161d2e 0%, #111827 100%)',
    border: '1px solid rgba(148,163,184,0.08)',
    borderRadius: 16,
    padding: '20px 22px',
  },
  chartTitle: {
    fontSize: 13, fontWeight: 600, color: '#94a3b8',
    marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  chartBadge: {
    fontSize: 10, fontWeight: 600, color: '#475569',
    background: 'rgba(148,163,184,0.06)',
    border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: 5, padding: '2px 8px',
  },
  actionBar: {
    display: 'flex',
    gap: 12,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  btnBase: {
    display: 'flex', alignItems: 'center', gap: 8,
    borderRadius: 10, padding: '10px 20px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
    border: 'none', transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
  },
};

function SpinnerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

export default function App() {
  const [dateRange, setDateRange] = useState('year');
  const [department, setDepartment] = useState('All');
  const [exportingPDF, setExportingPDF] = useState(false);
  const dashboardRef = useRef(null);

  const { kpis, turnoverData, headcountData, satisfactionData } = getFilteredData(dateRange, department);

  const handleExportPDF = async () => {
    setExportingPDF(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 1.8,
        backgroundColor: '#080c14',
        useCORS: true,
        logging: false,
      });
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgH = pw / ratio;

      let yOffset = 0;
      while (yOffset < imgH) {
        if (yOffset > 0) pdf.addPage();
        const srcY = (yOffset / imgH) * canvas.height;
        const sliceHeight = (ph / imgH) * canvas.height;
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeight;
        sliceCanvas.getContext('2d').drawImage(canvas, 0, srcY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 0, 0, pw, ph);
        yOffset += ph;
      }
      pdf.save('hr-metrics-dashboard.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExportingPDF(false);
    }
  };

  const deptLabel = department === 'All' ? 'All Departments' : department;

  return (
    <div style={s.app}>
      <Header />
      <Filters
        dateRange={dateRange}
        department={department}
        onDateRangeChange={setDateRange}
        onDepartmentChange={setDepartment}
      />

      <main style={s.main} ref={dashboardRef}>
        {/* KPI Section */}
        <div style={{ marginBottom: 24 }}>
          <div style={s.sectionLabel}>
            Key Performance Indicators
            <div style={s.sectionLine} />
            <span style={{ color: '#3b82f6', fontWeight: 600 }}>{deptLabel}</span>
          </div>
          <div style={s.kpiGrid}>
            {KPI_CONFIGS.map(cfg => (
              <KPICard key={cfg.id} {...cfg} {...kpis[cfg.id]} />
            ))}
          </div>
        </div>

        {/* Charts Row 1 */}
        <div style={{ marginBottom: 14 }}>
          <div style={s.sectionLabel}>
            Workforce Analytics
            <div style={s.sectionLine} />
          </div>
          <div style={s.chartsRow1}>
            <div style={s.chartCard}>
              <div style={s.chartTitle}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Monthly Turnover Trend
                  <InfoTooltip text="How the rate of employee departures has changed month by month. Useful for spotting seasonal patterns or the impact of specific events. A spike in mid-year often correlates with annual review cycles or competitor hiring surges." />
                </span>
                <span style={s.chartBadge}>12 months</span>
              </div>
              <TurnoverChart data={turnoverData} />
            </div>
            <div style={s.chartCard}>
              <div style={s.chartTitle}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Headcount by Department
                  <InfoTooltip text="How many full-time employees work in each team. Shows where your workforce is concentrated, where growth is happening, and which departments may be under-resourced relative to business demand." />
                </span>
                <span style={s.chartBadge}>FTEs</span>
              </div>
              <HeadcountChart data={headcountData} />
            </div>
          </div>

          {/* Satisfaction Chart */}
          <div style={s.chartCard}>
            <div style={s.chartTitle}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                Employee Satisfaction & Engagement
                <InfoTooltip text="Three signals tracked together over time: Satisfaction score (how happy employees are, out of 10), Engagement rate (the percentage who are actively engaged in their work), and eNPS — Employee Net Promoter Score (how likely employees are to recommend the company as a place to work, on a scale of -100 to +100)." />
              </span>
              <span style={s.chartBadge}>Score / Engagement % / eNPS</span>
            </div>
            <SatisfactionChart data={satisfactionData} />
          </div>
        </div>

        {/* Action Bar */}
        <div style={s.actionBar}>
          <button
            style={{
              ...s.btnBase,
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.14)',
              color: '#94a3b8',
            }}
            onClick={handleExportPDF}
            disabled={exportingPDF}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; e.currentTarget.style.color = '#f1f5f9'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            {exportingPDF ? <SpinnerIcon /> : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {exportingPDF ? 'Exporting…' : 'Export PDF'}
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(148,163,184,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#334155' }}>HR Metrics Dashboard · Acme Corporation · FY 2024</span>
          <span style={{ fontSize: 11, color: '#334155' }}>Confidential — Internal Use Only</span>
        </div>
      </main>
    </div>
  );
}
