import { useState } from 'react';

const TYPE_CONFIG = {
  positive: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', icon: '↑' },
  warning:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  icon: '!' },
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   icon: '✕' },
  neutral:  { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  icon: '→' },
};

const PRIORITY_CONFIG = {
  high:   { color: '#ef4444', label: 'HIGH' },
  medium: { color: '#f59e0b', label: 'MED'  },
  low:    { color: '#10b981', label: 'LOW'  },
};

const RISK_CONFIG = {
  low:      { color: '#10b981', label: 'Low Risk',      bg: 'rgba(16,185,129,0.1)'  },
  moderate: { color: '#f59e0b', label: 'Moderate Risk', bg: 'rgba(245,158,11,0.1)'  },
  high:     { color: '#ef4444', label: 'High Risk',     bg: 'rgba(239,68,68,0.1)'   },
};

const TAB_META = {
  plain: {
    label: 'Plain English',
    sublabel: 'For managers & stakeholders',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    summaryLabel: 'Overview',
  },
  pro: {
    label: 'HR Professional',
    sublabel: 'Analytics & strategic detail',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M2 20h20M6 20V10M12 20V4M18 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    summaryLabel: 'Executive Summary',
  },
};

function Skeleton() {
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[120, 80].map((w, i) => (
          <div key={i} style={{ width: w, height: 30, borderRadius: 8, background: 'rgba(148,163,184,0.08)', animation: 'shimmer 1.4s infinite' }} />
        ))}
      </div>
      <div style={{ height: 18, width: '60%', borderRadius: 6, background: 'rgba(148,163,184,0.06)', marginBottom: 10, animation: 'shimmer 1.4s infinite' }} />
      <div style={{ height: 60, borderRadius: 10, background: 'rgba(148,163,184,0.05)', marginBottom: 16, animation: 'shimmer 1.4s 0.1s infinite' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ height: 64, borderRadius: 10, background: 'rgba(148,163,184,0.04)', animation: `shimmer 1.4s ${i * 0.08}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.45} }`}</style>
    </div>
  );
}

function TerminologyGuide({ terms }) {
  if (!terms?.length) return null;
  return (
    <div style={{
      marginTop: 20,
      paddingTop: 16,
      borderTop: '1px solid rgba(148,163,184,0.07)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 11,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
          Terminology Guide
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {terms.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 11,
            alignItems: 'flex-start',
            padding: '8px 11px',
            background: 'rgba(148,163,184,0.03)',
            border: '1px solid rgba(148,163,184,0.07)',
            borderRadius: 8,
          }}>
            <span style={{
              flexShrink: 0,
              fontSize: 11,
              fontWeight: 600,
              color: '#3b82f6',
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.18)',
              borderRadius: 5,
              padding: '2px 8px',
              whiteSpace: 'nowrap',
              marginTop: 1,
            }}>
              {item.term}
            </span>
            <span style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
              {item.definition}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerspectiveContent({ data, summaryLabel }) {
  if (!data) return null;
  const rc = RISK_CONFIG[data.riskLevel] || RISK_CONFIG.moderate;

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      {/* Risk + reason row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: rc.bg, border: `1px solid ${rc.color}30`,
          borderRadius: 8, padding: '4px 11px', flexShrink: 0,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: rc.color }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: rc.color }}>{rc.label}</span>
        </div>
        {data.riskReason && (
          <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, flex: 1, minWidth: 180 }}>
            {data.riskReason}
          </p>
        )}
      </div>

      {/* Summary box */}
      {data.summary && (
        <div style={{
          background: 'rgba(148,163,184,0.04)',
          border: '1px solid rgba(148,163,184,0.1)',
          borderRadius: 12,
          padding: '13px 16px',
          marginBottom: 18,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            {summaryLabel}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>{data.summary}</p>
        </div>
      )}

      {/* Two-column: insights + recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {data.insights?.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>
              Key Insights
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {data.insights.map((item, i) => {
                const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.neutral;
                return (
                  <div key={i} style={{
                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                    borderRadius: 10, padding: '9px 12px',
                    display: 'flex', gap: 9,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      background: `${cfg.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: cfg.color,
                    }}>
                      {cfg.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.55 }}>{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.recommendations?.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>
              Recommendations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {data.recommendations.map((rec, i) => {
                const pc = PRIORITY_CONFIG[rec.priority] || PRIORITY_CONFIG.medium;
                return (
                  <div key={i} style={{
                    background: 'rgba(148,163,184,0.04)',
                    border: '1px solid rgba(148,163,184,0.1)',
                    borderRadius: 10, padding: '9px 12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.07em',
                        color: pc.color, background: `${pc.color}15`,
                        border: `1px solid ${pc.color}30`,
                        borderRadius: 4, padding: '2px 6px',
                      }}>
                        {pc.label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{rec.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.55 }}>{rec.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <TerminologyGuide terms={data.terminology} />

      <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

export default function AIInsightsPanel({ insights, loading, onClose }) {
  const [tab, setTab] = useState('plain');

  // Support both new dual-perspective format and legacy flat format (error fallbacks)
  const isDual = insights && (insights.plainEnglish || insights.hrProfessional);
  const activeData = isDual
    ? (tab === 'plain' ? insights.plainEnglish : insights.hrProfessional)
    : insights;

  return (
    <div style={{
      background: 'linear-gradient(145deg, #161d2e 0%, #111827 100%)',
      border: '1px solid rgba(59,130,246,0.2)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 20px 60px rgba(0,0,0,0.5)',
      animation: 'slideUp 0.3s ease',
    }}>

      {/* ── Panel header ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(148,163,184,0.08)',
        background: 'rgba(59,130,246,0.04)',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* Logo + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(59,130,246,0.35)',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>AI Workforce Analysis</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>Powered by Claude · claude-sonnet-4-6</div>
          </div>
        </div>

        {/* ── Tab toggle ── */}
        {!loading && isDual && (
          <div style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.35)',
            borderRadius: 11,
            padding: 3,
            border: '1px solid rgba(148,163,184,0.1)',
            gap: 2,
          }}>
            {(['plain', 'pro']).map(t => {
              const meta = TAB_META[t];
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    transition: 'all 0.18s ease',
                    background: active
                      ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                      : 'transparent',
                    color: active ? '#ffffff' : '#64748b',
                    boxShadow: active ? '0 2px 10px rgba(59,130,246,0.35)' : 'none',
                  }}
                  title={meta.sublabel}
                >
                  <span style={{ opacity: active ? 1 : 0.6 }}>{meta.icon}</span>
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(148,163,184,0.07)',
            border: '1px solid rgba(148,163,184,0.12)',
            borderRadius: 7,
            width: 28, height: 28, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#64748b',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Tab subtitle strip (shown only when tabs are visible) ── */}
      {!loading && isDual && (
        <div style={{
          padding: '7px 20px',
          borderBottom: '1px solid rgba(148,163,184,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          }} />
          <span style={{ fontSize: 11, color: '#475569' }}>
            {TAB_META[tab].sublabel}
          </span>
        </div>
      )}

      {/* ── Body ── */}
      {loading ? (
        <Skeleton />
      ) : activeData ? (
        <div style={{ padding: '18px 22px' }}>
          <PerspectiveContent
            key={tab}
            data={activeData}
            summaryLabel={TAB_META[tab]?.summaryLabel ?? 'Summary'}
          />
        </div>
      ) : null}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
