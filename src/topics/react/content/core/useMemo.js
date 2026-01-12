import { lazy } from "react";
import { Zap } from "lucide-react";

const UseMemoDemo = lazy(() => import("@/topics/react/components/UseMemoDemo"));

export const useMemoData = {
  id: "usememo",
  icon: Zap,
  title: "useMemo",
  category: "core",
  description: "Memoize expensive calculations",
  component: UseMemoDemo,
  theory: {
    overview:
      "A performance optimization hook that memoizes the result of a calculation. It only recomputes the value when one of its dependencies changes, preventing expensive calculations on every render.",
    definition:
      "useMemo is a React Hook that lets you cache the result of a calculation between re-renders.",
    syntax: `const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`,
    realLifeScenario:
      "Filtering a large list of products based on a search query. If the list has 10,000 items, you don't want to re-filter it just because a button color changed (unrelated state). `useMemo` ensures filtering only happens when `searchQuery` or `products` list changes.",
    pros: [
      "Prevents unnecessary expensive calculations.",
      "Optimizes performance for heavy data processing.",
      "Ensures referential equality for objects/arrays.",
    ],
    cons: [
      "Adds memory overhead (caching values).",
      "Can be premature optimization if calculation is cheap.",
    ],
    whenToUse: [
      "Expensive calculations (big arrays, complex regex)",
      "Preserving referential equality for dependency arrays",
      "Preventing re-renders of child components (with React.memo)",
    ],
    tips: [
      "Don't use it everywhere; only for expensive tasks",
      "Measure performance before optimizing",
    ],
    deepDive:
      "It runs during rendering. React may choose to discard the memoized value to free memory, so your code should work even if useMemo forgets the value (it's a hint, not a semantic guarantee).",
    commonPitfalls: [
      "Using it for side effects (use useEffect instead)",
      "Memoizing simple calculations (overhead > benefit)",
    ],
  },
};
