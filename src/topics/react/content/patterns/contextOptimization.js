import { lazy } from "react";
import { Users } from "lucide-react";

const ContextOptimizationDemo = lazy(() =>
  import("@/topics/react/components/ContextOptimizationDemo")
);

export const contextOptimizationData = {
  id: "context-optimization-pattern",
  icon: Users,
  title: "Context Optimization",
  category: "patterns",
  description: "Prevent unnecessary re-renders in Context API",
  component: ContextOptimizationDemo,
  theory: {
    overview:
      "Split Contexts to ensure components only re-render when the specific data they typically need changes.",
    deepDive:
      "Context API triggers re-renders for all consumers when the value reference changes. Splitting contexts allows granular subscriptions.",
    whenToUse: [
      "When Context object has multiple unrelated values (e.g. User and Theme)",
      "When frequency of updates differs drastically between values",
    ],
    syntax: `// Good Pattern
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <App />
  </ThemeContext.Provider>
</UserContext.Provider>`,
    tips: ["Keep contexts small and focused"],
    commonPitfalls: [
      "Passing a new object literal directly to `value` prop: This forces all consumers to re-render every time the Provider re-renders.",
    ],
  },
};
