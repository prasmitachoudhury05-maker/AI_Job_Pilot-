export function calculateSkillsScore(candidateSkills: string[], jobSkills: string[]): number {
  if (!jobSkills || jobSkills.length === 0) return 1.0;
  if (!candidateSkills || candidateSkills.length === 0) return 0.0;

  const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());
  let matched = 0;

  for (const js of jobSkills) {
    if (candidateSkillsLower.includes(js.toLowerCase())) {
      matched++;
    }
  }

  return matched / jobSkills.length;
}

export function calculateLocationScore(candidateLocation: string | null, jobLocation: string | null, isRemote: boolean): number {
  if (isRemote) return 1.0; // Remote is always a match
  if (!candidateLocation || !jobLocation) return 0.5; // Neutral if missing

  const cLoc = candidateLocation.toLowerCase();
  const jLoc = jobLocation.toLowerCase();

  if (cLoc === jLoc) return 1.0;
  if (jLoc.includes(cLoc) || cLoc.includes(jLoc)) return 0.8;
  
  return 0.2; // Different location
}

export function calculateOverallScore(scores: {
  skills: number;
  location: number;
  // experience, salary, industry, seniority...
}): number {
  const weights = {
    skills: 0.5,
    location: 0.3,
    other: 0.2
  };

  return (scores.skills * weights.skills) + (scores.location * weights.location);
}
