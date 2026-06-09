export interface RankingRequest {
  candidate_profile: {
    skills?: string[];
    experience_years?: number;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    industry?: string;
    seniority?: string;
  };
  job_id?: number;
  job_ids?: number[];
  use_ai?: boolean;
}

export interface RankingResponse {
  job_id: number;
  rank?: number;
  overall_score: number;
  confidence_score: number;
  breakdown: {
    skills: { score: number; weight: number };
    experience: { score: number; weight: number };
    location: { score: number; weight: number };
    salary: { score: number; weight: number };
    industry: { score: number; weight: number };
    seniority: { score: number; weight: number };
  };
  skills_match: {
    score: number;
    matched_skills: string[];
    missing_skills: string[];
    match_percentage: number;
  };
  experience_match: {
    score: number;
    status: string;
    candidate_years?: number;
    required_min?: number;
    required_max?: number;
  };
  location_match: {
    score: number;
    status: string;
  };
  salary_match: {
    score: number;
    status: string;
  };
  industry_match: {
    score: number;
    status: string;
  };
  seniority_match: {
    score: number;
    status: string;
  };
  ai_ranking?: any;
  explanation: string;
}

export interface BatchRankingResponse {
  rankings: RankingResponse[];
  total_jobs: number;
  api_cost: number;
  api_tokens: number;
}

export interface RankingFilterRequest {
  min_score?: number;
  max_score?: number;
  min_confidence?: number;
  skills?: string[];
  location?: string;
  remote_only?: boolean;
  job_type?: string;
}

export interface RankingComparisonRequest {
  job_ids: number[];
  candidate_profile: {
    skills?: string[];
    experience_years?: number;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    industry?: string;
    seniority?: string;
  };
}

export interface RankingComparisonResponse {
  comparisons: Array<{
    job_id: number;
    title: string;
    overall_score: number;
    confidence_score: number;
    breakdown: any;
  }>;
  best_match: any;
  analysis: string;
}
