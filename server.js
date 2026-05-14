import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert HR analytics consultant with 20 years of experience in workforce strategy, talent management, and people analytics.

When given HR data, respond with a valid JSON object (no markdown, no extra text) containing TWO complete analyses of the same data for different audiences:

{
  "plainEnglish": {
    "summary": "2-3 sentences written like you're explaining to a smart non-HR manager over coffee. No jargon. Use plain numbers and analogies.",
    "insights": [
      { "type": "positive|warning|critical|neutral", "title": "Short plain-language title", "description": "1-2 sentences a manager with no HR background would immediately understand" }
    ],
    "recommendations": [
      { "priority": "high|medium|low", "title": "Clear action anyone could act on", "description": "Concrete next step in plain language — who should do what and why it matters" }
    ],
    "riskLevel": "low|moderate|high",
    "riskReason": "One plain sentence on overall people risk",
    "terminology": [
      { "term": "Term used in this analysis", "definition": "Simple, plain-English explanation in 1-2 sentences. Written for someone with zero HR background — like explaining to a friend." }
    ]
  },
  "hrProfessional": {
    "summary": "2-3 sentences written the way a confident, experienced HR business partner would summarise the data in a leadership meeting — informed and precise, but natural and direct. Use the right HR terminology (attrition, eNPS, time-to-fill, engagement) where it fits naturally, but write in plain sentences. No stiff consultant prose, no packing in buzzwords for the sake of it.",
    "insights": [
      { "type": "positive|warning|critical|neutral", "title": "Clear, professional title", "description": "1-2 sentences. Use correct HR terms where genuinely useful (e.g. attrition rate, offer acceptance, absenteeism, eNPS) but keep it conversational — the kind of thing you'd say out loud in a meeting, not write in a formal report. Cite the actual numbers. Avoid phrases like 'basis points', 'human capital preservation', 'lagging attrition risk', or stacking multiple acronyms together." }
    ],
    "recommendations": [
      { "priority": "high|medium|low", "title": "Action-oriented title", "description": "A specific, practical recommendation. You can reference relevant HR practice (e.g. stay interviews, pulse surveys, EVP review, workforce planning) but explain it in one clear sentence — what to do, why it matters given the data, and who should own it. Sound like a trusted advisor, not a textbook." }
    ],
    "riskLevel": "low|moderate|high",
    "riskReason": "One clear sentence on overall people risk — professional but conversational, no jargon stacking",
    "terminology": [
      { "term": "Term used in this analysis", "definition": "Precise but conversational definition for an HR practitioner — what the term means, how it's measured or used, and why it matters in context." }
    ]
  }
}

Provide exactly 4 insights and 3 recommendations in each section. For terminology: include 4-5 terms per section that are most relevant to the specific findings in that analysis — terms that actually appear or are implied in your insights and recommendations. Plain English terms should be the kind a manager might vaguely know but appreciate having clearly defined. HR Professional terms should be the more technical ones used in that section. The two sections can share some terms but should each define them for their own audience. Be specific and data-driven in both.`;

app.post('/api/insights', async (req, res) => {
  try {
    const { data } = req.body;

    const userMessage = `Analyze this HR dashboard data and provide insights:

KPI Metrics:
- Turnover Rate: ${data.kpis.turnoverRate.value}% (previous: ${data.kpis.turnoverRate.previous}%)
- Time to Fill: ${data.kpis.timeToFill.value} days (previous: ${data.kpis.timeToFill.previous} days)
- Total Headcount: ${data.kpis.headcount.value} (previous: ${data.kpis.headcount.previous})
- Absenteeism Rate: ${data.kpis.absenteeismRate.value}% (previous: ${data.kpis.absenteeismRate.previous}%)
- Offer Acceptance Rate: ${data.kpis.offerAcceptanceRate.value}% (previous: ${data.kpis.offerAcceptanceRate.previous}%)
- Retention Rate: ${data.kpis.retentionRate.value}% (previous: ${data.kpis.retentionRate.previous}%)

Turnover Trend (last ${data.turnoverData.length} months):
${data.turnoverData.map(d => `${d.month}: ${d.rate}%`).join(', ')}

Headcount by Department:
${data.headcountData.map(d => `${d.department}: ${d.count} (${d.change >= 0 ? '+' : ''}${d.change})`).join(', ')}

Satisfaction Scores (last ${data.satisfactionData.length} months):
${data.satisfactionData.map(d => `${d.month}: ${d.score}/10 (eNPS: ${d.eNPS})`).join(', ')}

Active Filters: Date Range = ${data.dateRange}, Department = ${data.department}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userMessage }],
    });

    const rawText = response.content[0].text.trim();
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { summary: rawText, insights: [], recommendations: [] };

    res.json({ insights: parsed });
  } catch (err) {
    console.error('Insights error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to generate insights' });
  }
});

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY not set. AI Insights will not work.');
  }
});
