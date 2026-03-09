import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import InterviewPage from "./pages/InterviewPage";
import ResumePage from "./pages/ResumePage";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: ResumePage,
});

const interviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/interview",
  component: InterviewPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  resumeRoute,
  interviewRoute,
]);

export { createRouter };
