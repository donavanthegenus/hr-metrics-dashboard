import { DEPARTMENTS, DATE_RANGES } from '../data/sampleData';

const s = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    padding: '16px 32px',
    background: 'rgba(13,17,23,0.6)',
    borderBottom: '1px solid rgba(148,163,184,0.07)',
  },
  left: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  label: { fontSize: 12, color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' },
  select: {
    background: '#131a26',
    border: '1px solid rgba(148,163,184,0.12)',
    color: '#f1f5f9',
    borderRadius: 8,
    padding: '7px 32px 7px 12px',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    transition: 'border-color 0.15s',
  },
  divider: { width: 1, height: 20, background: 'rgba(148,163,184,0.1)', margin: '0 4px' },
  right: { display: 'flex', alignItems: 'center', gap: 8 },
  updateChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 11,
    color: '#64748b',
    background: 'rgba(100,116,139,0.08)',
    padding: '4px 10px',
    borderRadius: 6,
  },
};

export default function Filters({ dateRange, department, onDateRangeChange, onDepartmentChange }) {
  return (
    <div style={s.bar}>
      <div style={s.left}>
        <span style={s.label}>Period</span>
        <div style={{ position: 'relative' }}>
          <select
            style={s.select}
            value={dateRange}
            onChange={e => onDateRangeChange(e.target.value)}
          >
            {DATE_RANGES.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <div style={s.divider} />

        <span style={s.label}>Department</span>
        <select
          style={s.select}
          value={department}
          onChange={e => onDepartmentChange(e.target.value)}
        >
          {DEPARTMENTS.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>
      </div>

      <div style={s.right}>
        <div style={s.updateChip}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2"/>
            <path d="M12 6v6l4 2" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Updated 2 min ago
        </div>
      </div>
    </div>
  );
}
