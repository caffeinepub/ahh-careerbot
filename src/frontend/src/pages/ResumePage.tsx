import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { type ResumeAnalysis, analyzeResume } from "@/lib/resumeAnalysis";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  History,
  Loader2,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface HistoryEntry {
  id: number;
  snippet: string;
  score: number;
  grade: string;
  timestamp: Date;
}

const SAMPLE_RESUME = `Sarah Johnson
Senior Product Manager | sarah.johnson@email.com | LinkedIn: linkedin.com/in/sarahjohnson

PROFESSIONAL SUMMARY
Results-driven Senior Product Manager with 7+ years of experience leading cross-functional teams to deliver innovative SaaS products. Increased user engagement by 42% and reduced churn by 18% at TechCorp. Passionate about data-driven decisions and customer-centric development.

EXPERIENCE
Senior Product Manager — TechCorp (2020–Present)
• Led a team of 12 engineers and designers to launch 3 major product features, increasing revenue by $2.4M annually
• Improved customer retention by 18% through targeted onboarding improvements
• Collaborated with sales and marketing to develop go-to-market strategies for 5 product launches
• Achieved 94% on-time delivery across all Q3 sprints

Product Manager — StartupAI (2017–2020)
• Developed the roadmap for an AI-powered analytics dashboard adopted by 500+ enterprise clients
• Managed stakeholder relationships across C-suite, engineering, and customer success teams
• Launched MVP in 6 months, achieving 120% of Year 1 revenue targets

SKILLS
Product Strategy | Roadmapping | Agile/Scrum | SQL | Tableau | JIRA | A/B Testing | User Research

EDUCATION
MBA, Stanford University | B.S. Computer Science, UC Berkeley`;

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-teal"
      : score >= 60
        ? "text-yellow-400"
        : "text-destructive";
  const bgColor =
    score >= 80
      ? "from-[oklch(0.72_0.19_195/0.15)]"
      : score >= 60
        ? "from-[oklch(0.80_0.18_80/0.15)]"
        : "from-[oklch(0.62_0.2_25/0.15)]";

  return (
    <div
      className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${bgColor} to-transparent flex items-center justify-center border-2 border-current ${color}`}
    >
      <div className="text-center">
        <div className={`font-display text-3xl font-black ${color}`}>
          {score}
        </div>
        <div className="text-xs text-muted-foreground font-mono">/ 100</div>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    await new Promise((r) => setTimeout(r, 1600));

    const result = analyzeResume(resumeText);
    setAnalysis(result);

    setHistory((prev) => [
      {
        id: Date.now(),
        snippet: `${resumeText.slice(0, 60)}…`,
        score: result.score,
        grade: result.grade,
        timestamp: new Date(),
      },
      ...prev.slice(0, 2),
    ]);

    setIsAnalyzing(false);
  };

  const loadSample = () => setResumeText(SAMPLE_RESUME);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[oklch(var(--teal)/0.12)] flex items-center justify-center">
              <FileText className="h-5 w-5 text-teal" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black">
              Resume <span className="gradient-text">Coach</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-base ml-[52px]">
            Paste your resume below for an instant AI-powered analysis with
            scores, strengths, and improvement tips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input panel */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.12)]">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base font-bold flex items-center justify-between">
                  <span>Paste Your Resume</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-teal hover:text-teal hover:bg-[oklch(var(--teal)/0.1)] h-7 px-2"
                    onClick={loadSample}
                  >
                    Load sample
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  data-ocid="resume.input.textarea"
                  placeholder="Paste your full resume text here — include your experience, skills, education, and achievements..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[340px] font-mono text-sm resize-none bg-[oklch(var(--navy-deep)/0.6)] border-[oklch(var(--teal)/0.15)] focus:border-[oklch(var(--teal)/0.4)] placeholder:text-muted-foreground/50 leading-relaxed"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    {resumeText.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <Button
                    data-ocid="resume.analyze.submit_button"
                    onClick={handleAnalyze}
                    disabled={!resumeText.trim() || isAnalyzing}
                    className="gap-2 bg-[oklch(var(--teal))] hover:bg-[oklch(var(--teal-bright))] text-[oklch(var(--navy-deep))] font-bold disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.08)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-sm font-bold flex items-center gap-2 text-muted-foreground">
                      <History className="h-4 w-4" />
                      Recent Analyses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {history.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-[oklch(var(--navy-deep)/0.5)] border border-[oklch(var(--teal)/0.08)]"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                            entry.score >= 80
                              ? "bg-[oklch(var(--teal)/0.15)] text-teal"
                              : entry.score >= 60
                                ? "bg-[oklch(0.80_0.15_80/0.15)] text-yellow-400"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {entry.score}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground truncate">
                            {entry.snippet}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {entry.grade} ·{" "}
                            {entry.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Results panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  key="loading"
                  data-ocid="resume.loading_state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.15)] glow-teal-sm">
                    <CardContent className="p-8 flex flex-col items-center gap-5 text-center">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-2 border-[oklch(var(--teal)/0.2)] animate-ping" />
                        <div className="absolute inset-2 rounded-full border-2 border-t-teal border-[oklch(var(--teal)/0.2)] animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="h-6 w-6 text-teal" />
                        </div>
                      </div>
                      <div>
                        <p className="font-display font-bold text-base text-foreground">
                          AI is analyzing your resume…
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Scanning for keywords, structure, and impact
                        </p>
                      </div>
                      <div className="w-full space-y-2">
                        {[
                          "Parsing content",
                          "Matching keywords",
                          "Scoring profile",
                        ].map((step, i) => (
                          <div
                            key={step}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <Loader2
                              className="h-3 w-3 animate-spin text-teal shrink-0"
                              style={{ animationDelay: `${i * 0.3}s` }}
                            />
                            {step}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {analysis && !isAnalyzing && (
                <motion.div
                  key="results"
                  data-ocid="resume.result.card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.2)] glow-teal-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display text-base font-bold">
                          Analysis Result
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            analysis.score >= 80
                              ? "border-[oklch(var(--teal)/0.4)] text-teal"
                              : analysis.score >= 60
                                ? "border-yellow-400/40 text-yellow-400"
                                : "border-destructive/40 text-destructive"
                          }
                        >
                          {analysis.grade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {/* Score */}
                      <div className="flex items-center gap-5">
                        <ScoreRing score={analysis.score} />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Resume Score
                          </p>
                          <Progress
                            value={analysis.score}
                            className="w-32 h-2 bg-[oklch(var(--navy-deep)/0.5)]"
                          />
                          <p className="text-xs text-muted-foreground mt-1.5">
                            {analysis.matchedKeywords.length} keywords matched
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-[oklch(var(--teal)/0.08)]" />

                      {/* Strengths */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                          <h3 className="font-display text-sm font-bold text-teal">
                            Strengths
                          </h3>
                        </div>
                        <ul className="space-y-1.5">
                          {analysis.strengths.map((s) => (
                            <li
                              key={s}
                              className="flex items-start gap-2 text-xs text-foreground"
                            >
                              <ChevronRight className="h-3 w-3 text-teal mt-0.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="bg-[oklch(var(--teal)/0.08)]" />

                      {/* Improvements */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="h-4 w-4 text-yellow-400 shrink-0" />
                          <h3 className="font-display text-sm font-bold text-yellow-400">
                            Improvements
                          </h3>
                        </div>
                        <ul className="space-y-1.5">
                          {analysis.improvements.map((tip) => (
                            <li
                              key={tip}
                              className="flex items-start gap-2 text-xs text-foreground"
                            >
                              <ArrowUpRight className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="bg-[oklch(var(--teal)/0.08)]" />

                      {/* ATS Keywords */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
                          <h3 className="font-display text-sm font-bold text-muted-foreground">
                            ATS Keyword Suggestions
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.keywords.map((kw) => (
                            <Badge
                              key={kw}
                              variant="secondary"
                              className="text-xs bg-[oklch(var(--teal)/0.08)] text-teal border border-[oklch(var(--teal)/0.2)] font-mono"
                            >
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {!analysis && !isAnalyzing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.08)] border-dashed">
                    <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-[oklch(var(--teal)/0.08)] flex items-center justify-center">
                        <Star className="h-7 w-7 text-[oklch(var(--teal)/0.4)]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-foreground mb-1">
                          Your analysis will appear here
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Paste your resume and click "Analyze Resume" to
                          receive your personalized score, strengths, and
                          actionable tips.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Brain icon"
      role="img"
      {...props}
    >
      <title>Brain</title>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
