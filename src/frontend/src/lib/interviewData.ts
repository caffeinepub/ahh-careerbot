export type Category = "General" | "Behavioral" | "Technical" | "Situational";

export interface Question {
  id: number;
  text: string;
  tip: string;
  sampleAnswer: string;
}

export interface InterviewFeedback {
  score: number;
  grade: string;
  positive: string[];
  improvements: string[];
  modelTip: string;
}

export const questionBank: Record<Category, Question[]> = {
  General: [
    {
      id: 1,
      text: "Tell me about yourself.",
      tip: "Structure with present, past, future.",
      sampleAnswer:
        "Start with your current role and key achievements, then connect your background to why you're excited about this specific opportunity.",
    },
    {
      id: 2,
      text: "What are your greatest strengths?",
      tip: "Give 2–3 strengths with specific examples.",
      sampleAnswer:
        "Name your strengths, then immediately follow each with a concrete situation where that strength delivered a measurable result.",
    },
    {
      id: 3,
      text: "Where do you see yourself in 5 years?",
      tip: "Align with company growth and your professional development.",
      sampleAnswer:
        "Show ambition that aligns with the company's trajectory — mention a skill you want to master and a level of impact you aim to have.",
    },
    {
      id: 4,
      text: "Why do you want to work here?",
      tip: "Research the company's mission and values.",
      sampleAnswer:
        "Reference something specific: a product, initiative, or value statement that resonates with your own professional goals or experiences.",
    },
    {
      id: 5,
      text: "What is your greatest weakness?",
      tip: "Name a real weakness and describe the steps you're taking to improve.",
      sampleAnswer:
        "Choose a genuine weakness, explain the impact it had, and detail the concrete steps you've taken to actively address it.",
    },
  ],
  Behavioral: [
    {
      id: 6,
      text: "Tell me about a time you faced a difficult challenge at work.",
      tip: "Use the STAR method (Situation, Task, Action, Result).",
      sampleAnswer:
        "Set the scene briefly, define your specific responsibility, walk through the actions you took, and end with a quantified result.",
    },
    {
      id: 7,
      text: "Describe a time you demonstrated leadership.",
      tip: "Even if not a manager, give an example of taking initiative.",
      sampleAnswer:
        "Leadership can be informal — describe a moment you stepped up, rallied others, or drove a decision that moved the team forward.",
    },
    {
      id: 8,
      text: "Tell me about a time you failed and what you learned.",
      tip: "Be honest, focus on the lesson and recovery.",
      sampleAnswer:
        "Own the failure clearly, explain the root cause, and pivot quickly to the specific lesson learned and how you applied it afterward.",
    },
    {
      id: 9,
      text: "Describe a conflict with a coworker and how you resolved it.",
      tip: "Focus on the resolution, not the conflict.",
      sampleAnswer:
        "Keep the conflict description brief and neutral, then spend most of your time on the collaborative resolution and positive outcome.",
    },
    {
      id: 10,
      text: "Tell me about a time you went above and beyond.",
      tip: "Quantify results when possible.",
      sampleAnswer:
        "Describe what the standard expectation was, what extra action you chose to take, and the measurable difference it made.",
    },
  ],
  Technical: [
    {
      id: 11,
      text: "How do you stay current with industry trends and technologies?",
      tip: "Mention specific resources: blogs, courses, communities.",
      sampleAnswer:
        "Name 2–3 specific resources you actually use (newsletter, conference, community), and give a recent example of something you learned and applied.",
    },
    {
      id: 12,
      text: "Describe your approach to debugging a complex problem.",
      tip: "Walk through a systematic process step by step.",
      sampleAnswer:
        "Isolate → reproduce → hypothesize → test → verify. Describe a real debugging experience that shows methodical thinking.",
    },
    {
      id: 13,
      text: "How do you prioritize tasks when everything seems urgent?",
      tip: "Mention frameworks like Eisenhower matrix or MoSCoW.",
      sampleAnswer:
        "Explain your framework, then give a concrete example of applying it when you had competing high-priority tasks and what outcome you achieved.",
    },
    {
      id: 14,
      text: "Tell me about a complex technical project you completed.",
      tip: "Highlight your specific contribution and measurable outcomes.",
      sampleAnswer:
        "Describe the project scope, your specific technical ownership, the challenges you overcame, and the measurable business or technical outcome.",
    },
    {
      id: 15,
      text: "How do you handle working with legacy code or systems?",
      tip: "Emphasize documentation, incremental improvement, and testing.",
      sampleAnswer:
        "Describe your approach: read existing docs first, add tests before refactoring, and make incremental changes with clear rollback strategies.",
    },
  ],
  Situational: [
    {
      id: 16,
      text: "If you had to meet a tight deadline with limited resources, what would you do?",
      tip: "Show prioritization and communication skills.",
      sampleAnswer:
        "Triage ruthlessly, communicate constraints early to stakeholders, and focus 80% of effort on the 20% of tasks with the highest impact.",
    },
    {
      id: 17,
      text: "How would you handle receiving critical feedback from your manager?",
      tip: "Show openness, ask clarifying questions, create an action plan.",
      sampleAnswer:
        "Thank them for the feedback, ask clarifying questions to understand the full picture, then present a concrete improvement plan within 48 hours.",
    },
    {
      id: 18,
      text: "If a team member consistently missed deadlines, how would you address it?",
      tip: "Show empathy and constructive communication.",
      sampleAnswer:
        "Open with curiosity, not blame — ask if there are blockers you can help remove. If the pattern persists, escalate with documented specifics.",
    },
    {
      id: 19,
      text: "What would you do if you disagreed with your manager's decision?",
      tip: "Show respect, voice concerns professionally, then support the decision.",
      sampleAnswer:
        "Request a private conversation, present data and alternative perspectives clearly, and once a final decision is made, commit to executing it fully.",
    },
    {
      id: 20,
      text: "How would you onboard yourself into a new role quickly?",
      tip: "Mention learning resources, building relationships, quick wins.",
      sampleAnswer:
        "First 30 days: listen and observe. 60 days: identify one quick win. 90 days: produce something meaningful that earns trust and demonstrates value.",
    },
  ],
};

export function getRandomQuestion(
  category: Category,
  excludeId?: number,
): Question {
  const pool = questionBank[category].filter((q) => q.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateFeedback(
  answer: string,
  question: Question,
): InterviewFeedback {
  const length = answer.trim().length;

  let score: number;
  let grade: string;
  let positive: string[];
  let improvements: string[];

  const hasNumbers = /\d/.test(answer);
  const hasExample =
    /for example|for instance|specifically|such as|when i|time when/i.test(
      answer,
    );
  const hasStar = /situation|task|action|result|challenge|outcome/i.test(
    answer,
  );

  if (length < 50) {
    score = 30;
    grade = "Too Brief";
    positive = ["You made an attempt at the question."];
    improvements = [
      "Your answer is too short. Aim for at least 3–5 sentences.",
      "Provide a specific example from your experience.",
      "Use the STAR method (Situation, Task, Action, Result) for structure.",
      question.tip,
    ];
  } else if (length < 150) {
    score = 58;
    grade = "Developing";
    positive = ["You addressed the question directly."];
    if (hasExample) positive.push("Good use of a specific example.");
    improvements = [
      "Expand your answer with more context and detail.",
      "Quantify your impact with numbers or percentages if possible.",
      hasStar ? "" : "Consider structuring with the STAR method for clarity.",
      question.tip,
    ].filter(Boolean);
  } else {
    score = hasNumbers && hasExample ? 90 : hasExample || hasStar ? 80 : 72;
    grade = score >= 85 ? "Excellent" : score >= 78 ? "Strong" : "Good";
    positive = ["Well-structured and detailed answer."];
    if (hasNumbers)
      positive.push("Great job quantifying your impact with numbers.");
    if (hasExample) positive.push("Effective use of specific examples.");
    if (hasStar)
      positive.push("Clear STAR structure makes your answer compelling.");
    improvements = [];
    if (!hasNumbers)
      improvements.push(
        "Quantify your results (e.g., '40% faster', 'team of 8') to be more persuasive.",
      );
    if (!hasExample)
      improvements.push(
        "Add a concrete, specific example to make your answer memorable.",
      );
    improvements.push(
      "Practice delivering this answer in under 2 minutes for optimal impact.",
    );
  }

  return {
    score,
    grade,
    positive,
    improvements: improvements.slice(0, 3),
    modelTip: question.sampleAnswer,
  };
}
