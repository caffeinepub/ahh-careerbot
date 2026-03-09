export interface ResumeAnalysis {
  score: number;
  grade: string;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  matchedKeywords: string[];
}

const keywordMap: Record<string, string> = {
  leadership: "Leadership & Management",
  management: "Team Management",
  achieved: "Results-Oriented Mindset",
  improved: "Continuous Improvement",
  increased: "Growth-Driven Impact",
  developed: "Development & Initiative",
  collaborate: "Collaboration Skills",
  results: "Results-Driven Approach",
  "problem-solving": "Problem-Solving Skills",
  communication: "Communication Skills",
  analytical: "Analytical Thinking",
  strategic: "Strategic Planning",
  innovation: "Innovation Mindset",
  mentored: "Mentoring & Coaching",
  optimized: "Process Optimization",
  delivered: "Delivery & Execution",
  launched: "Product Launch Experience",
  "cross-functional": "Cross-Functional Experience",
};

const improvementSuggestions = [
  "Add quantified achievements (e.g., 'Increased revenue by 35%') to demonstrate measurable impact.",
  "Include industry-specific ATS keywords relevant to your target role.",
  "Add a professional summary section at the top to hook recruiters in 3–5 seconds.",
  "Use strong action verbs at the start of each bullet point.",
  "List relevant certifications or professional development courses.",
  "Ensure consistent date formatting throughout your experience section.",
  "Include links to your GitHub, portfolio, or LinkedIn profile.",
  "Tailor your skills section to match the specific job description.",
];

const atsKeywords = [
  "Results-driven",
  "Collaborated cross-functionally",
  "Achieved X% improvement",
  "Led a team of N",
  "Managed stakeholders",
  "Delivered projects on time",
  "Reduced costs by",
  "Increased efficiency",
  "Spearheaded initiatives",
  "Data-driven decisions",
];

export function analyzeResume(text: string): ResumeAnalysis {
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const matchedKeywords: string[] = [];
  for (const keyword of Object.keys(keywordMap)) {
    if (lower.includes(keyword)) {
      matchedKeywords.push(keyword);
    }
  }

  const keywordCount = matchedKeywords.length;
  const lengthBonus = Math.min(wordCount / 10, 20);
  const score = Math.min(Math.round(50 + keywordCount * 5 + lengthBonus), 100);

  const grade =
    score >= 85
      ? "Excellent"
      : score >= 70
        ? "Good"
        : score >= 55
          ? "Fair"
          : "Needs Work";

  const strengths: string[] = matchedKeywords
    .slice(0, 5)
    .map((k) => keywordMap[k]);

  if (strengths.length === 0) {
    strengths.push("Resume has been submitted for review.");
  }

  if (wordCount > 400) {
    strengths.unshift("Comprehensive content with sufficient detail.");
  }

  // Suggest improvements for missing keyword categories
  const missingAreas: string[] = [];
  if (
    !lower.includes("led") &&
    !lower.includes("leadership") &&
    !lower.includes("management")
  ) {
    missingAreas.push("Add leadership or team management experience examples.");
  }
  if (
    !lower.includes("%") &&
    !lower.includes("increased") &&
    !lower.includes("improved")
  ) {
    missingAreas.push(
      "Include quantified achievements with percentages or numbers.",
    );
  }
  if (
    !lower.includes("objective") &&
    !lower.includes("summary") &&
    !lower.includes("profile")
  ) {
    missingAreas.push("Add a professional summary at the top of your resume.");
  }
  if (
    !lower.includes("skill") &&
    !lower.includes("proficient") &&
    !lower.includes("expertise")
  ) {
    missingAreas.push(
      "Create a dedicated Skills section with technical and soft skills.",
    );
  }

  // Add generic improvement suggestions
  const remaining = improvementSuggestions
    .filter((s) => !missingAreas.includes(s))
    .slice(0, Math.max(0, 4 - missingAreas.length));

  const improvements = [...missingAreas, ...remaining].slice(0, 4);

  const keywords = atsKeywords.slice(0, 6);

  return { score, grade, strengths, improvements, keywords, matchedKeywords };
}
