export type RiskLevelType = "Low" | "Medium" | "High";
export type InsuranceType = {
  title: string;
  score: number;
  logo: string;
  tvl: number;
  url: string;
  min: string;
  max: string;
  coverage: number;
  category: string;
};
