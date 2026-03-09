import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  type Category,
  type InterviewFeedback,
  type Question,
  generateFeedback,
  getRandomQuestion,
} from "@/lib/interviewData";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Loader2,
  MessageSquareText,
  Mic,
  SkipForward,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CATEGORIES: Category[] = [
  "General",
  "Behavioral",
  "Technical",
  "Situational",
];

const categoryIcons: Record<Category, React.ElementType> = {
  General: MessageSquareText,
  Behavioral: ThumbsUp,
  Technical: Mic,
  Situational: Lightbulb,
};

const categoryColors: Record<Category, string> = {
  General: "text-teal border-[oklch(var(--teal)/0.4)]",
  Behavioral: "text-purple-400 border-purple-400/40",
  Technical: "text-orange-400 border-orange-400/40",
  Situational: "text-green-400 border-green-400/40",
};

export default function InterviewPage() {
  const [category, setCategory] = useState<Category>("General");
  const [question, setQuestion] = useState<Question>(() =>
    getRandomQuestion("General"),
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setQuestion(getRandomQuestion(cat));
    setAnswer("");
    setFeedback(null);
  };

  const handleGetFeedback = async () => {
    if (!answer.trim()) return;
    setIsLoading(true);
    setFeedback(null);

    await new Promise((r) => setTimeout(r, 1200));

    const result = generateFeedback(answer, question);
    setFeedback(result);
    setSessionCount((c) => c + 1);
    setTotalScore((s) => s + result.score);

    setIsLoading(false);
  };

  const handleNextQuestion = () => {
    setQuestion(getRandomQuestion(category, question.id));
    setAnswer("");
    setFeedback(null);
  };

  const avgScore = sessionCount > 0 ? Math.round(totalScore / sessionCount) : 0;

  const scoreColor = (score: number) =>
    score >= 80
      ? "text-teal"
      : score >= 60
        ? "text-yellow-400"
        : "text-destructive";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[oklch(var(--teal)/0.12)] flex items-center justify-center">
                <MessageSquareText className="h-5 w-5 text-teal" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-black">
                  Interview <span className="gradient-text">Coach</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Practice with AI-powered feedback across all question types
                </p>
              </div>
            </div>

            {/* Session stats */}
            {sessionCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 card-glass px-4 py-2.5 rounded-xl border border-[oklch(var(--teal)/0.15)]"
              >
                <div className="text-center">
                  <div className="font-display font-black text-lg text-teal leading-none">
                    {sessionCount}
                  </div>
                  <div className="text-xs text-muted-foreground">practiced</div>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 bg-[oklch(var(--teal)/0.15)]"
                />
                <div className="text-center">
                  <div
                    className={`font-display font-black text-lg leading-none ${scoreColor(avgScore)}`}
                  >
                    {avgScore}
                  </div>
                  <div className="text-xs text-muted-foreground">avg score</div>
                </div>
                {sessionCount >= 3 && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-8 bg-[oklch(var(--teal)/0.15)]"
                    />
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  </>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs
            value={category}
            onValueChange={(v) => handleCategoryChange(v as Category)}
          >
            <TabsList className="bg-[oklch(var(--navy-deep)/0.7)] border border-[oklch(var(--teal)/0.1)] p-1 h-auto flex-wrap gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-ocid="interview.category.tab"
                    className="gap-2 data-[state=active]:bg-[oklch(var(--teal)/0.12)] data-[state=active]:text-teal data-[state=active]:shadow-none text-muted-foreground font-sans text-sm"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* Question + answer panel */}
                  <div className="lg:col-span-3 flex flex-col gap-5">
                    {/* Question card */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.18)] glow-teal-sm">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className={`text-xs font-mono ${categoryColors[cat]}`}
                              >
                                {cat}
                              </Badge>
                              <Button
                                data-ocid="interview.next.button"
                                variant="ghost"
                                size="sm"
                                onClick={handleNextQuestion}
                                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                              >
                                Next question
                                <SkipForward className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-5">
                            <p className="font-display text-lg font-bold text-foreground leading-snug">
                              {question.text}
                            </p>
                            <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-[oklch(var(--teal)/0.05)] border border-[oklch(var(--teal)/0.1)]">
                              <Lightbulb className="h-3.5 w-3.5 text-teal mt-0.5 shrink-0" />
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                <strong className="text-teal/80">Tip:</strong>{" "}
                                {question.tip}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>

                    {/* Answer input */}
                    <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.1)]">
                      <CardHeader className="pb-3">
                        <CardTitle className="font-display text-sm font-bold">
                          Your Answer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          data-ocid="interview.answer.textarea"
                          placeholder="Type your answer here. For behavioral questions, use the STAR method: Situation → Task → Action → Result..."
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="min-h-[180px] font-sans text-sm resize-none bg-[oklch(var(--navy-deep)/0.6)] border-[oklch(var(--teal)/0.15)] focus:border-[oklch(var(--teal)/0.4)] placeholder:text-muted-foreground/40 leading-relaxed"
                        />
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground font-mono">
                            {answer.trim().length} chars
                            {answer.trim().length > 0 &&
                              (answer.trim().length < 50
                                ? " · too brief"
                                : answer.trim().length < 150
                                  ? " · developing"
                                  : " · detailed")}
                          </span>
                          <Button
                            data-ocid="interview.feedback.submit_button"
                            onClick={handleGetFeedback}
                            disabled={!answer.trim() || isLoading}
                            className="gap-2 bg-[oklch(var(--teal))] hover:bg-[oklch(var(--teal-bright))] text-[oklch(var(--navy-deep))] font-bold disabled:opacity-50"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Analyzing…
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Get Feedback
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Feedback panel */}
                  <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                      {isLoading && (
                        <motion.div
                          key="loading"
                          data-ocid="interview.loading_state"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.15)] glow-teal-sm">
                            <CardContent className="p-8 flex flex-col items-center gap-5 text-center">
                              <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-2 border-[oklch(var(--teal)/0.2)] animate-ping" />
                                <div className="absolute inset-2 rounded-full border-2 border-t-teal border-[oklch(var(--teal)/0.2)] animate-spin" />
                              </div>
                              <div>
                                <p className="font-display font-bold text-sm text-foreground">
                                  Evaluating your answer…
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Checking structure, depth, and relevance
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {feedback && !isLoading && (
                        <motion.div
                          key="feedback"
                          data-ocid="interview.result.card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.2)] glow-teal-sm">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="font-display text-base font-bold">
                                  Feedback
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={
                                    feedback.score >= 80
                                      ? "border-[oklch(var(--teal)/0.4)] text-teal"
                                      : feedback.score >= 60
                                        ? "border-yellow-400/40 text-yellow-400"
                                        : "border-destructive/40 text-destructive"
                                  }
                                >
                                  {feedback.grade}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* Score bar */}
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xs text-muted-foreground">
                                    Answer Score
                                  </span>
                                  <span
                                    className={`font-mono font-bold text-sm ${scoreColor(feedback.score)}`}
                                  >
                                    {feedback.score}/100
                                  </span>
                                </div>
                                <Progress
                                  value={feedback.score}
                                  className="h-2 bg-[oklch(var(--navy-deep)/0.5)]"
                                />
                              </div>

                              <Separator className="bg-[oklch(var(--teal)/0.08)]" />

                              {/* What was good */}
                              <div>
                                <div className="flex items-center gap-2 mb-2.5">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-teal" />
                                  <h3 className="font-display text-xs font-bold text-teal uppercase tracking-wide">
                                    What Worked
                                  </h3>
                                </div>
                                <ul className="space-y-1.5">
                                  {feedback.positive.map((p) => (
                                    <li
                                      key={p}
                                      className="flex items-start gap-2 text-xs text-foreground"
                                    >
                                      <ChevronRight className="h-3 w-3 text-teal mt-0.5 shrink-0" />
                                      {p}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {feedback.improvements.length > 0 && (
                                <>
                                  <Separator className="bg-[oklch(var(--teal)/0.08)]" />
                                  <div>
                                    <div className="flex items-center gap-2 mb-2.5">
                                      <AlertCircle className="h-3.5 w-3.5 text-yellow-400" />
                                      <h3 className="font-display text-xs font-bold text-yellow-400 uppercase tracking-wide">
                                        Improvements
                                      </h3>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {feedback.improvements.map((imp) => (
                                        <li
                                          key={imp}
                                          className="flex items-start gap-2 text-xs text-foreground"
                                        >
                                          <ChevronRight className="h-3 w-3 text-yellow-400 mt-0.5 shrink-0" />
                                          {imp}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              )}

                              <Separator className="bg-[oklch(var(--teal)/0.08)]" />

                              {/* Model answer tip */}
                              <div>
                                <div className="flex items-center gap-2 mb-2.5">
                                  <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                                  <h3 className="font-display text-xs font-bold text-muted-foreground uppercase tracking-wide">
                                    Model Answer Tip
                                  </h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed p-2.5 rounded-lg bg-[oklch(var(--navy-deep)/0.4)] border border-[oklch(var(--teal)/0.08)] italic">
                                  {feedback.modelTip}
                                </p>
                              </div>

                              <Button
                                data-ocid="interview.next.button"
                                onClick={handleNextQuestion}
                                variant="outline"
                                className="w-full gap-2 border-[oklch(var(--teal)/0.3)] text-teal hover:bg-[oklch(var(--teal)/0.08)] mt-2"
                              >
                                <SkipForward className="h-4 w-4" />
                                Next Question
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {!feedback && !isLoading && (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Card className="card-glass shadow-card border-[oklch(var(--teal)/0.08)] border-dashed">
                            <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
                              <div className="w-12 h-12 rounded-2xl bg-[oklch(var(--teal)/0.08)] flex items-center justify-center">
                                <MessageSquareText className="h-6 w-6 text-[oklch(var(--teal)/0.35)]" />
                              </div>
                              <div>
                                <p className="font-display font-bold text-sm text-foreground mb-1">
                                  Ready for feedback?
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  Type your answer to the question and click
                                  "Get Feedback" to receive your personalized
                                  coaching.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
