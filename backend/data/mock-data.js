const mockIssuers = [
  {
    id: 'iss_001',
    name: 'Apple Inc.',
    industry: 'Technology',
    rating: 'Aa1',
    outlook: 'Stable',
    lastUpdated: '2026-02-15',
    country: 'USA'
  },
  {
    id: 'iss_002',
    name: 'Tesla Inc.',
    industry: 'Automotive',
    rating: 'Baa2',
    outlook: 'Positive',
    lastUpdated: '2026-02-10',
    country: 'USA'
  },
  {
    id: 'iss_003',
    name: 'Deutsche Bank AG',
    industry: 'Financial Services',
    rating: 'A3',
    outlook: 'Negative',
    lastUpdated: '2026-02-20',
    country: 'Germany'
  }
];

const mockIssuerDetails = {
  iss_001: {
    issuer: mockIssuers[0],
    history: [
      {
        date: '2026-02-15',
        rating: 'Aa1',
        action: 'Affirmed',
        rationale: 'Stable product ecosystem and strong liquidity support the current rating.'
      },
      {
        date: '2025-08-22',
        rating: 'Aa1',
        action: 'Upgrade',
        rationale: 'Improved profitability and durable balance sheet strengthened credit quality.'
      },
      {
        date: '2024-11-05',
        rating: 'Aa2',
        action: 'Affirmed',
        rationale: 'Large cash reserves offset cyclical demand pressure in hardware segments.'
      }
    ],
    drivers: [
      {
        id: 'drv_1',
        category: 'Financial',
        title: 'Strong Cash Flow Generation',
        impact: 'Positive',
        score: 9,
        description: 'Consistent operating cash flow and disciplined capital allocation support flexibility.'
      },
      {
        id: 'drv_2',
        category: 'Market',
        title: 'Competitive Pressure',
        impact: 'Negative',
        score: 6,
        description: 'Premium positioning is durable, but global device competition remains intense.'
      },
      {
        id: 'drv_3',
        category: 'Governance',
        title: 'Strong Leadership',
        impact: 'Positive',
        score: 9,
        description: 'Experienced management continues to execute against long-term strategy effectively.'
      }
    ],
    aiInsight: {
      summary:
        'Apple maintains a high-grade credit profile due to resilient cash generation, a strong balance sheet, and broad ecosystem lock-in. Competitive intensity is manageable relative to its liquidity and margin profile.',
      confidence: 92,
      generatedAt: '2026-02-15T09:30:00Z'
    }
  },
  iss_002: {
    issuer: mockIssuers[1],
    history: [
      {
        date: '2026-02-10',
        rating: 'Baa2',
        action: 'Affirmed',
        rationale: 'Execution remains solid while margin volatility keeps the rating in the lower investment-grade band.'
      },
      {
        date: '2025-07-18',
        rating: 'Baa2',
        action: 'Upgrade',
        rationale: 'Operating scale improved with stronger free cash flow conversion.'
      },
      {
        date: '2024-10-03',
        rating: 'Baa3',
        action: 'Affirmed',
        rationale: 'Product leadership balanced against execution and macro demand risks.'
      }
    ],
    drivers: [
      {
        id: 'drv_4',
        category: 'Operational',
        title: 'Manufacturing Scale-Up',
        impact: 'Neutral',
        score: 7,
        description: 'Production ramp continues to improve, but execution consistency still matters.'
      },
      {
        id: 'drv_5',
        category: 'Financial',
        title: 'Margin Volatility',
        impact: 'Negative',
        score: 5,
        description: 'Profitability remains exposed to pricing actions and input cost shifts.'
      },
      {
        id: 'drv_6',
        category: 'Market',
        title: 'Brand and Demand Strength',
        impact: 'Positive',
        score: 8,
        description: 'Demand remains strong across core EV segments, supporting medium-term scale.'
      }
    ],
    aiInsight: {
      summary:
        'Tesla’s rating is supported by strong market demand and improving scale, but margin swings and execution risk cap upside. The positive outlook reflects potential for further operating stability.',
      confidence: 86,
      generatedAt: '2026-02-10T11:00:00Z'
    }
  },
  iss_003: {
    issuer: mockIssuers[2],
    history: [
      {
        date: '2026-02-20',
        rating: 'A3',
        action: 'Affirmed',
        rationale: 'Franchise strength remains intact, though earnings sensitivity continues to weigh on outlook.'
      },
      {
        date: '2025-06-12',
        rating: 'A3',
        action: 'Downgrade',
        rationale: 'Capital markets volatility and execution pressure weakened earnings visibility.'
      },
      {
        date: '2024-12-02',
        rating: 'A2',
        action: 'Affirmed',
        rationale: 'Diversified funding profile and systemic importance supported the prior rating.'
      }
    ],
    drivers: [
      {
        id: 'drv_7',
        category: 'Financial',
        title: 'Capital Position',
        impact: 'Positive',
        score: 8,
        description: 'Capital buffers remain supportive relative to current stress assumptions.'
      },
      {
        id: 'drv_8',
        category: 'Market',
        title: 'Revenue Sensitivity',
        impact: 'Negative',
        score: 5,
        description: 'Investment banking and trading revenue remain sensitive to market conditions.'
      },
      {
        id: 'drv_9',
        category: 'Governance',
        title: 'Risk Oversight',
        impact: 'Neutral',
        score: 7,
        description: 'Risk controls are improving, though ongoing monitoring is still warranted.'
      }
    ],
    aiInsight: {
      summary:
        'Deutsche Bank benefits from franchise depth and capital support, but earnings variability and market exposure constrain the rating. The negative outlook captures downside sensitivity if operating momentum softens.',
      confidence: 84,
      generatedAt: '2026-02-20T08:45:00Z'
    }
  }
};

module.exports = { mockIssuers, mockIssuerDetails };
