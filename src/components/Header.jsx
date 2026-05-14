const s = {
  header: {
    background: 'linear-gradient(135deg, #0d1117 0%, #131a26 100%)',
    borderBottom: '1px solid rgba(148,163,184,0.08)',
    padding: '0 32px',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(12px)',
  },
  left: { display: 'flex', alignItems: 'center', gap: 16 },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 0 20px rgba(59,130,246,0.35)',
  },
  titleGroup: {},
  title: { fontSize: 18, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2 },
  subtitle: { fontSize: 12, color: '#64748b', fontWeight: 400, marginTop: 1 },
  right: { display: 'flex', alignItems: 'center', gap: 20 },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: 12,
    color: '#10b981',
    fontWeight: 500,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#10b981',
    animation: 'pulse 2s infinite',
  },
  company: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 14px',
    background: 'rgba(148,163,184,0.05)',
    border: '1px solid rgba(148,163,184,0.1)',
    borderRadius: 8,
    cursor: 'pointer',
  },
  companyAvatar: {
    width: 28,
    height: 28,
    borderRadius: 7,
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: 'white',
  },
  companyName: { fontSize: 13, fontWeight: 600, color: '#94a3b8' },
};

export default function Header() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header style={s.header}>
      <div style={s.left}>
        <div style={s.logoBox}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={s.titleGroup}>
          <div style={s.title}>HR Metrics Dashboard</div>
          <div style={s.subtitle}>{dateStr} · People Analytics</div>
        </div>
      </div>

      <div style={s.right}>
        <div style={s.badge}>
          <div style={s.dot} />
          Live Data
        </div>
        <div style={s.company}>
          <div style={s.companyAvatar}>AC</div>
          <span style={s.companyName}>Acme Corporation</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </header>
  );
}
