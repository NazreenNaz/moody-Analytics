export interface Issuer {
  id: string;
  name: string;
  industry: string;
  rating: string;
  outlook: 'Positive' | 'Stable' | 'Negative';
  lastUpdated: string;
  country: string;
}

export interface RatingHistory {
  date: string;
  rating: string;
  action: 'Upgrade' | 'Downgrade' | 'Affirmed';
  rationale: string;
}

export interface KeyDriver {
  id: string;
  category: 'Financial' | 'Operational' | 'Market' | 'Governance';
  title: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  score: number;
  description: string;
}

export interface AIInsight {
  summary: string;
  confidence: number;
  generatedAt: string;
}

export interface IssuerDetailResponse {
  issuer: Issuer;
  history: RatingHistory[];
  drivers: KeyDriver[];
  aiInsight: AIInsight;
}

export interface FeedbackSubmission {
  issuerId: string;
  user: {
    name: string;
    email: string;
    role: string;
    organization?: string;
  };
  ratings: {
    accuracy: number;
    driverRelevance: number;
    aiInsightQuality: number;
    timeliness: number;
  };
  feedback: {
    agreedDrivers: string[];
    disagreedDrivers: string[];
    additionalFactors?: string;
    comments?: string;
  };
  metadata: {
    submittedAt: string;
    version: string;
  };
}
