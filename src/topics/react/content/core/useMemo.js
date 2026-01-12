import { lazy } from "react";
import { Zap } from "lucide-react";

// Lazy Load Component
const UseMemoDemo = lazy(() => import("@/topics/react/components/UseMemoDemo"));

export const useMemoData = {
  id: "usememo",
  icon: Zap,
  title: "useMemo",
  category: "core",
  description: "Cache expensive calculations between renders",
  component: UseMemoDemo,
  theory: {
    overview:
      "useMemo memoizes the result of a computation and only recalculates when dependencies change.",
    deepDive:
      "Similar to useCallback, but for values. It executes the function passed to it during rendering and caches the return value. This is useful for referential equality of objects/arrays or for skipping expensive calculations (O(n) operations on large datasets).",
    whenToUse: [
      "Expensive calculations (filtering/sorting large arrays)",
      "Creating objects/arrays passed to child components as props (to preserve referential equality)",
      "preventing useEffect loops when an object is a dependency",
    ],
    syntax: `const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`,
    tips: [
      "Profile before optimizing; don't memoize primitive values or cheap calcs",
      "Ensure the function is pure (no side effects)",
    ],
    commonPitfalls: [
      "Memoizing everything: Increases memory usage and garbage collection overhead.",
      "Missing dependencies: Cached value will be stale.",
    ],
  },
};
