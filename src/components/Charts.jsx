import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, Area, AreaChart,
  Cell, LabelList,
} from 'recharts';

const DEPT_COLORS = {
  Engineering: '#3b82f6',
  Sales:       '#f59e0b',
  Marketing:   '#8b5cf6',
  Operations:  '#06b6d4',
  Product:     '#10b981',
  Finance:     '#f97316',
  HR:          '#ec4899',
};

function ChartTooltip({ active, payload, label, valueLabel, valueColor = '#3b82f6', suffix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1e2534',
      border: '1px solid rgba(148,163,184,0.15)',
      borderRadius: 10,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      minWidth: 130,
    }}>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: i > 0 ? 4 : 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color || valueColor, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.name}:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>
            {entry.value}{suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

const axisStyle = { fill: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif' };
const gridStyle = { stroke: 'rgba(148,163,184,0.06)', strokeDasharray: '4 4' };

export function TurnoverChart({ data }) {
  const avg = data.length ? (data.reduce((s, d) => s + d.rate, 0) / data.length).toFixed(1) : 0;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="turnoverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="hiresGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
        <Tooltip content={<ChartTooltip suffix="%" />} />
        <ReferenceLine y={parseFloat(avg)} stroke="rgba(148,163,184,0.2)" strokeDasharray="6 3"
          label={{ value: `Avg ${avg}%`, fill: '#64748b', fontSize: 10, position: 'right' }} />
        <Legend
          formatter={v => <span style={{ fontSize: 12, color: '#94a3b8' }}>{v}</span>}
          iconType="circle" iconSize={8}
        />
        <Area type="monotone" dataKey="rate" name="Turnover Rate" stroke="#ef4444" strokeWidth={2.5}
          fill="url(#turnoverGrad)" dot={false} activeDot={{ r: 5, fill: '#ef4444', strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function HeadcountChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
        <CartesianGrid {...gridStyle} horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="department" tick={{ ...axisStyle, fontSize: 11 }}
          axisLine={false} tickLine={false} width={80} />
        <Tooltip content={({ active, payload, label }) => {
          if (!active || !payload?.length) return null;
          const d = payload[0]?.payload;
          const chg = d?.change;
          return (
            <div style={{
              background: '#1e2534',
              border: '1px solid rgba(148,163,184,0.15)',
              borderRadius: 10,
              padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>{d?.count} FTEs</div>
              {chg !== undefined && (
                <div style={{ fontSize: 11, color: chg >= 0 ? '#10b981' : '#ef4444', marginTop: 2 }}>
                  {chg >= 0 ? '+' : ''}{chg} vs last period
                </div>
              )}
            </div>
          );
        }} />
        <Bar dataKey="count" name="Headcount" radius={[0, 6, 6, 0]} maxBarSize={22}>
          {data.map((entry) => (
            <Cell key={entry.department} fill={DEPT_COLORS[entry.department] || '#3b82f6'} />
          ))}
          <LabelList dataKey="count" position="right" style={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SatisfactionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="engGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis yAxisId="score" domain={[6, 10]} tick={axisStyle} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}/10`} />
        <YAxis yAxisId="eng" orientation="right" domain={[60, 100]} tick={axisStyle} axisLine={false}
          tickLine={false} tickFormatter={v => `${v}%`} />
        <Tooltip content={({ active, payload, label }) => {
          if (!active || !payload?.length) return null;
          return (
            <div style={{
              background: '#1e2534',
              border: '1px solid rgba(148,163,184,0.15)',
              borderRadius: 10,
              padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              minWidth: 160,
            }}>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>{label}</div>
              {payload.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: i > 0 ? 4 : 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.stroke, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.name}:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>
                    {entry.value}{entry.name.includes('Score') ? '/10' : '%'}
                  </span>
                </div>
              ))}
            </div>
          );
        }} />
        <Legend
          formatter={v => <span style={{ fontSize: 12, color: '#94a3b8' }}>{v}</span>}
          iconType="circle" iconSize={8}
        />
        <Line yAxisId="score" type="monotone" dataKey="score" name="Satisfaction Score"
          stroke="url(#scoreGrad)" strokeWidth={2.5} dot={false}
          activeDot={{ r: 5, fill: '#8b5cf6', strokeWidth: 0 }} />
        <Line yAxisId="eng" type="monotone" dataKey="engagement" name="Engagement Rate"
          stroke="url(#engGrad)" strokeWidth={2.5} dot={false} strokeDasharray="0"
          activeDot={{ r: 5, fill: '#06b6d4', strokeWidth: 0 }} />
        <Line yAxisId="eng" type="monotone" dataKey="eNPS" name="eNPS Score"
          stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 4" dot={false}
          activeDot={{ r: 4, fill: '#f59e0b', strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
