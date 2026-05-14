export const DEPARTMENTS = ['All', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Product'];

export const DATE_RANGES = [
  { value: 'month', label: 'Last 30 Days' },
  { value: 'quarter', label: 'Last Quarter' },
  { value: 'half', label: 'Last 6 Months' },
  { value: 'year', label: 'Last 12 Months' },
];

const baseMonthlyTurnover = [
  { month: 'Jan', rate: 11.2, hires: 42, exits: 38 },
  { month: 'Feb', rate: 10.8, hires: 38, exits: 31 },
  { month: 'Mar', rate: 12.1, hires: 51, exits: 44 },
  { month: 'Apr', rate: 11.5, hires: 45, exits: 39 },
  { month: 'May', rate: 13.2, hires: 58, exits: 52 },
  { month: 'Jun', rate: 14.1, hires: 62, exits: 59 },
  { month: 'Jul', rate: 13.8, hires: 55, exits: 56 },
  { month: 'Aug', rate: 12.9, hires: 49, exits: 48 },
  { month: 'Sep', rate: 11.7, hires: 47, exits: 43 },
  { month: 'Oct', rate: 12.3, hires: 52, exits: 47 },
  { month: 'Nov', rate: 13.5, hires: 59, exits: 55 },
  { month: 'Dec', rate: 12.5, hires: 44, exits: 40 },
];

const baseSatisfaction = [
  { month: 'Jan', score: 7.2, engagement: 72, eNPS: 18 },
  { month: 'Feb', score: 7.4, engagement: 74, eNPS: 21 },
  { month: 'Mar', score: 7.1, engagement: 71, eNPS: 17 },
  { month: 'Apr', score: 7.6, engagement: 76, eNPS: 25 },
  { month: 'May', score: 7.8, engagement: 78, eNPS: 28 },
  { month: 'Jun', score: 7.5, engagement: 75, eNPS: 24 },
  { month: 'Jul', score: 7.9, engagement: 79, eNPS: 30 },
  { month: 'Aug', score: 8.1, engagement: 81, eNPS: 34 },
  { month: 'Sep', score: 8.0, engagement: 80, eNPS: 33 },
  { month: 'Oct', score: 8.2, engagement: 82, eNPS: 37 },
  { month: 'Nov', score: 8.4, engagement: 84, eNPS: 41 },
  { month: 'Dec', score: 8.3, engagement: 83, eNPS: 39 },
];

const baseHeadcount = [
  { department: 'Engineering', count: 342, change: 15 },
  { department: 'Sales', count: 256, change: 11 },
  { department: 'Marketing', count: 187, change: -14 },
  { department: 'Operations', count: 198, change: 9 },
  { department: 'Product', count: 143, change: 11 },
  { department: 'Finance', count: 89, change: -2 },
  { department: 'HR', count: 32, change: 2 },
];

const deptMultipliers = {
  All:         { turnover: 1.00, ttf: 1.00, hc: 1247, prev_hc: 1186, abs: 1.00, oar: 1.00, ret: 1.00 },
  Engineering: { turnover: 0.84, ttf: 1.32, hc: 342,  prev_hc: 327,  abs: 0.88, oar: 1.06, ret: 1.04 },
  Sales:       { turnover: 1.47, ttf: 0.79, hc: 256,  prev_hc: 245,  abs: 1.12, oar: 0.91, ret: 0.88 },
  Marketing:   { turnover: 1.12, ttf: 0.88, hc: 187,  prev_hc: 201,  abs: 1.01, oar: 0.94, ret: 0.94 },
  HR:          { turnover: 0.94, ttf: 0.84, hc: 32,   prev_hc: 30,   abs: 0.79, oar: 1.11, ret: 1.06 },
  Finance:     { turnover: 0.74, ttf: 1.11, hc: 89,   prev_hc: 91,   abs: 0.84, oar: 1.09, ret: 1.09 },
  Operations:  { turnover: 1.22, ttf: 0.74, hc: 198,  prev_hc: 189,  abs: 1.16, oar: 0.89, ret: 0.91 },
  Product:     { turnover: 0.89, ttf: 1.21, hc: 143,  prev_hc: 132,  abs: 0.94, oar: 1.03, ret: 1.04 },
};

const BASE_KPIS = {
  turnoverRate:        { value: 12.5, previous: 14.1 },
  timeToFill:          { value: 28,   previous: 34   },
  headcount:           { value: 1247, previous: 1186 },
  absenteeismRate:     { value: 3.2,  previous: 2.8  },
  offerAcceptanceRate: { value: 84,   previous: 79   },
  retentionRate:       { value: 87.5, previous: 85.9 },
};

export const KPI_CONFIGS = [
  {
    id: 'turnoverRate',
    title: 'Turnover Rate',
    unit: '%',
    isGoodWhenUp: false,
    icon: 'turnover',
    color: '#ef4444',
    description: 'Annual voluntary & involuntary',
    tooltip: 'The percentage of employees who left the company during this period — whether they resigned, were let go, or retired. Lower is generally better. High turnover is expensive: replacing one employee typically costs 50–200% of their annual salary.',
  },
  {
    id: 'timeToFill',
    title: 'Time to Fill',
    unit: ' days',
    isGoodWhenUp: false,
    icon: 'clock',
    color: '#f59e0b',
    description: 'Avg. days to fill open roles',
    tooltip: 'The average number of days from when a job is posted to when an offer is accepted. Shorter means a more efficient hiring process and less time with an empty seat. Industry average is around 30–45 days depending on the role.',
  },
  {
    id: 'headcount',
    title: 'Total Headcount',
    unit: '',
    isGoodWhenUp: true,
    icon: 'users',
    color: '#3b82f6',
    description: 'Full-time employees (FTE)',
    tooltip: 'The total number of full-time employees currently working at the company. Growth typically reflects business expansion or increased hiring. Comparing this to prior periods shows whether the organisation is scaling up or down.',
  },
  {
    id: 'absenteeismRate',
    title: 'Absenteeism Rate',
    unit: '%',
    isGoodWhenUp: false,
    icon: 'calendar',
    color: '#8b5cf6',
    description: 'Unplanned absence rate',
    tooltip: 'The percentage of scheduled working days lost to unplanned absences (sick days, no-shows). Lower is better. A rising rate is often an early warning sign of low morale, burnout, or wellbeing issues across the workforce.',
  },
  {
    id: 'offerAcceptanceRate',
    title: 'Offer Acceptance',
    unit: '%',
    isGoodWhenUp: true,
    icon: 'check',
    color: '#10b981',
    description: 'Accepted vs. extended offers',
    tooltip: 'The percentage of job offers that candidates said yes to. A high rate means your compensation, culture, and employer brand are competitive. A low rate usually signals that offers are being beaten by competitors on salary or perks.',
  },
  {
    id: 'retentionRate',
    title: 'Retention Rate',
    unit: '%',
    isGoodWhenUp: true,
    icon: 'shield',
    color: '#06b6d4',
    description: '12-month employee retention',
    tooltip: 'The percentage of employees who stayed with the company over the past 12 months. High retention means people want to stay — which reduces recruiting costs, preserves institutional knowledge, and keeps teams stable. The inverse of turnover rate.',
  },
];

function roundTo(num, decimals) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

export function getFilteredData(dateRange, department) {
  const m = deptMultipliers[department] || deptMultipliers.All;

  // Slice months based on date range
  const sliceMap = { month: 1, quarter: 3, half: 6, year: 12 };
  const count = sliceMap[dateRange] ?? 12;
  const turnoverData = baseMonthlyTurnover.slice(-count).map(d => ({
    ...d,
    rate: roundTo(d.rate * m.turnover, 1),
  }));
  const satisfactionData = baseSatisfaction.slice(-count);

  // Department headcount filter
  const headcountData = department === 'All'
    ? baseHeadcount
    : baseHeadcount.filter(d => d.department === department);

  // Build KPI values
  const kpis = {
    turnoverRate:        { value: roundTo(BASE_KPIS.turnoverRate.value * m.turnover, 1),        previous: roundTo(BASE_KPIS.turnoverRate.previous * m.turnover, 1) },
    timeToFill:          { value: Math.round(BASE_KPIS.timeToFill.value * m.ttf),               previous: Math.round(BASE_KPIS.timeToFill.previous * m.ttf) },
    headcount:           { value: m.hc,                                                          previous: m.prev_hc },
    absenteeismRate:     { value: roundTo(BASE_KPIS.absenteeismRate.value * m.abs, 1),           previous: roundTo(BASE_KPIS.absenteeismRate.previous * m.abs, 1) },
    offerAcceptanceRate: { value: Math.round(BASE_KPIS.offerAcceptanceRate.value * m.oar),       previous: Math.round(BASE_KPIS.offerAcceptanceRate.previous * m.oar) },
    retentionRate:       { value: roundTo(BASE_KPIS.retentionRate.value * m.ret, 1),             previous: roundTo(BASE_KPIS.retentionRate.previous * m.ret, 1) },
  };

  return { kpis, turnoverData, headcountData, satisfactionData };
}
