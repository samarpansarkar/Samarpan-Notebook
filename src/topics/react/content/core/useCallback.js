import { lazy } from "react";
import { Code } from "lucide-react";

// Lazy Load Component
const UseCallbackDemo = lazy(() =>
  import("@/topics/react/components/UseCallbackDemo")
);

export const useCallbackData = {
  id: "usecallback",
  icon: Code,
  title: "useCallback",
  category: "core",
  description: "Memoize callback functions to prevent unnecessary re-renders",
  component: UseCallbackDemo,
  theory: {
    overview:
      "useCallback returns a memoized version of a callback function that only changes if dependencies change.",
    deepDive:
      "In JavaScript, functions are objects. Every time a component re-renders, all functions defined inside it are recreated with new references. Closures formed by these functions also capture new scope. exact equality (===) checks fail between the old and new function. `useCallback` caches the function instance between renders, preserving referential equality unless dependencies change. This is crucial when passing callbacks to `React.memo`ized components.",
    whenToUse: [
      "Passing callbacks to optimized child components (React.memo)",
      " preventing child re-renders caused by new function references",
      "When the callback is used as a dependency in other hooks (useEffect)",
    ],
    syntax: `const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);`,
    tips: [
      "Include all dependencies in the dependency array",
      "Don't optimize pre-maturely; it has memory overhead",
      "Always pair with React.memo on the child component",
    ],
    commonPitfalls: [
      "Omitting dependencies: The function will see stale state/props from the closure where it was created.",
      "Using over inline functions for cheap components: The overhead of checking dependencies can be higher than just re-creating the function.",
    ],
  },
};
