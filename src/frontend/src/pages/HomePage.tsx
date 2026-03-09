import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  FileText,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    desc: "Advanced NLP parses your resume against ATS systems and industry benchmarks.",
  },
  {
    icon: Target,
    title: "Targeted Feedback",
    desc: "Pinpoints exact gaps — from missing keywords to weak phrasing — with actionable fixes.",
  },
  {
    icon: TrendingUp,
    title: "Interview Mastery",
    desc: "Structured practice across behavioral, technical, and situational question types.",
  },
  {
    icon: Award,
    title: "Score & Track",
    desc: "Quantified scoring gives clear metrics for your improvement over time.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Real-time coaching — no waiting, no scheduling, no generic advice.",
  },
  {
    icon: CheckCircle2,
    title: "Session History",
    desc: "Review past analyses and track how your resume has evolved.",
  },
];

const stats = [
  { value: "93%", label: "Interview success rate" },
  { value: "4.2×", label: "More callbacks" },
  { value: "2 min", label: "Resume analysis time" },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Decorative grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.72 0.19 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.19 195) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.72_0.19_195/0.05)] blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[oklch(0.55_0.14_195/0.06)] blur-3xl" />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="border-[oklch(var(--teal)/0.4)] text-teal font-mono text-xs px-3 py-1 gap-1.5"
            >
              <Sparkles className="h-3 w-3" />
              AI Career Coaching Platform
            </Badge>
          </motion.div>

          <motion.div variants={fadeUp}>
            <img
              src="/assets/generated/ahh-careerbot-logo-transparent.dim_400x160.png"
              alt="AHH CareerBot"
              className="h-20 md:h-24 w-auto object-contain mx-auto drop-shadow-[0_0_30px_oklch(0.72_0.19_195/0.4)] animate-float"
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            Your <span className="gradient-text">AI-Powered</span>
            <br />
            Career Coach
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-sans"
          >
            Land your dream job with AI-driven resume analysis, interview
            practice, and personalized coaching — all in one platform.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-6 md:gap-10 py-2"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-black text-teal">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto justify-center"
          >
            <Link to="/resume">
              <Button
                data-ocid="home.resume_cta.button"
                size="lg"
                className="w-full sm:w-auto gap-2.5 bg-[oklch(var(--teal))] hover:bg-[oklch(var(--teal-bright))] text-[oklch(var(--navy-deep))] font-bold text-base px-8 shadow-[teal-md] hover:shadow-[teal-md] transition-all duration-200 hover:scale-[1.03]"
              >
                <FileText className="h-5 w-5" />
                Analyze My Resume
                <ArrowRight className="h-4 w-4 ml-0.5" />
              </Button>
            </Link>
            <Link to="/interview">
              <Button
                data-ocid="home.interview_cta.button"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2.5 border-[oklch(var(--teal)/0.4)] text-teal hover:bg-[oklch(var(--teal)/0.08)] hover:border-teal font-semibold text-base px-8 transition-all duration-200 hover:scale-[1.03]"
              >
                <MessageSquareText className="h-5 w-5" />
                Practice Interview
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-black mb-3">
              Everything you need to{" "}
              <span className="gradient-text">land the job</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From resume optimization to mock interviews — AHH CareerBot has
              you covered.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="card-glass h-full shadow-card hover:border-[oklch(var(--teal)/0.3)] transition-all duration-300 hover:shadow-[teal-sm] group">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[oklch(var(--teal)/0.12)] flex items-center justify-center group-hover:bg-[oklch(var(--teal)/0.2)] transition-colors">
                      <Icon className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold mb-1.5 text-foreground">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="card-glass rounded-3xl p-10 text-center border border-[oklch(var(--teal)/0.2)] glow-teal"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-8 w-8 text-teal mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
              Ready to accelerate your career?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Join thousands of professionals who use AHH CareerBot to land
              roles at top companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resume">
                <Button
                  size="lg"
                  className="gap-2 bg-[oklch(var(--teal))] hover:bg-[oklch(var(--teal-bright))] text-[oklch(var(--navy-deep))] font-bold px-8"
                >
                  <FileText className="h-5 w-5" />
                  Analyze My Resume
                </Button>
              </Link>
              <Link to="/interview">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-[oklch(var(--teal)/0.4)] text-teal hover:bg-[oklch(var(--teal)/0.08)] px-8"
                >
                  <MessageSquareText className="h-5 w-5" />
                  Practice Interview
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
