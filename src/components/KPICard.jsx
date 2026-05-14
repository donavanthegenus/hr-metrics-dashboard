import InfoTooltip from './InfoTooltip';

const ICONS = {
  turnover: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17 1l4 4-4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 13v2a4 4 0 01-4 4H3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  clock: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  users: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  calendar: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 16l2 2 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 4L12 14.01l-3-3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function MiniSparkline({ color, trend }) {
  const up = trend === 'up';
  const points = up
    ? '0,28 10,22 20,25 30,18 40,20 50,12 60,8'
    : '0,8 10,14 20,10 30,18 40,15 50,22 60,28';
  return (
    <svg width="62" height="36" viewBox="0 0 62 36" fill="none" style={{ opacity: 0.7 }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KPICard({ id, title, unit, isGoodWhenUp, icon, color, description, tooltip, value, previous }) {
  const change = previous > 0 ? ((value - previous) / previous) * 100 : 0;
  const absChange = Math.abs(change).toFixed(1);
  const isUp = change > 0;
  const isGood = isGoodWhenUp ? isUp : !isUp;
  const trendColor = isGood ? '#10b981' : '#ef4444';
  const formattedValue = id === 'headcount'
    ? value.toLocaleString()
    : value + unit;

  return (
    <div style={{
      background: 'linear-gradient(145deg, #161d2e 0%, #111827 100%)',
      border: `1px solid rgba(148,163,184,0.08)`,
      borderRadius: 16,
      padding: '20px 22px',
      position: 'relative',
      overflow: 'visible',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, display: 'flex', alignItems: 'center' }}>
            {title}
            {tooltip && <InfoTooltip text={tooltip} />}
          </div>
          <div style={{ fontSize: 10, color: '#475569' }}>{description}</div>
        </div>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {ICONS[icon]?.(color)}
        </div>
      </div>

      {/* Value */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1 }}>
            {formattedValue}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              background: `${trendColor}15`,
              border: `1px solid ${trendColor}30`,
              borderRadius: 6,
              padding: '2px 7px',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d={isUp ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}
                  stroke={trendColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: trendColor }}>{absChange}%</span>
            </div>
            <span style={{ fontSize: 11, color: '#475569' }}>vs prior period</span>
          </div>
        </div>
        <MiniSparkline color={color} trend={isUp ? 'up' : 'down'} />
      </div>
    </div>
  );
}
