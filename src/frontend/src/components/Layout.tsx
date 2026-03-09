import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  Home,
  Menu,
  MessageSquareText,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home", icon: Home, ocid: "nav.home.link" },
  {
    to: "/resume",
    label: "Resume Coach",
    icon: BriefcaseBusiness,
    ocid: "nav.resume.link",
  },
  {
    to: "/interview",
    label: "Interview Coach",
    icon: MessageSquareText,
    ocid: "nav.interview.link",
  },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-[oklch(var(--teal)/0.15)] bg-[oklch(var(--navy-deep)/0.9)] backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.img
              src="/assets/generated/ahh-careerbot-logo-transparent.dim_400x160.png"
              alt="AHH CareerBot"
              className="h-9 w-auto object-contain"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, ocid }) => {
              const isActive =
                to === "/" ? currentPath === "/" : currentPath.startsWith(to);
              return (
                <Link key={to} to={to} data-ocid={ocid}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-2 font-sans text-sm transition-all duration-200",
                      isActive
                        ? "text-teal bg-[oklch(var(--teal)/0.1)] border border-[oklch(var(--teal)/0.25)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[oklch(var(--teal)/0.1)] bg-[oklch(var(--navy-deep)/0.95)] overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {navLinks.map(({ to, label, icon: Icon, ocid }) => {
                  const isActive =
                    to === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      data-ocid={ocid}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 font-sans",
                          isActive
                            ? "text-teal bg-[oklch(var(--teal)/0.1)]"
                            : "text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[oklch(var(--teal)/0.1)] py-6 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-teal-bright transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
