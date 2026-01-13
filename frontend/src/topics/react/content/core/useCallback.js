import { lazy } from "react";
import { Code } from "lucide-react";

const UseCallbackDemo = lazy(() =>
  import("@/topics/react/components/UseCallbackDemo")
);

export const useCallbackData = {
  id: "usecallback",
  icon: Code,
  title: "useCallback",
  category: "core",
  description: "Memoize callback functions",
  component: UseCallbackDemo,
  theory: {
    overview:
      "Similar to `useMemo`, but specifically for functions. It returns a memoized version of the callback that only changes if one of the dependencies has changed, useful for passing stable functions to optimized child components.",
    definition:
      "useCallback is a React Hook that lets you cache a function definition between re-renders.",
    syntax: `const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
    realLifeScenario:
      "Passing a 'DeleteItem' function to a list of expensive 'Row' components. If `DeleteItem` involves state, it gets recreated every render. This forces every 'Row' to re-render (even if memoized). `useCallback` keeps the function identity stable, so Rows only re-render if their data changes.",
    pros: [
      "Prevents unnecessary re-renders of child components.",
      "Maintains referential equality for functions.",
      "Essential for dependencies in other hooks (useEffect dependencies).",
    ],
    cons: [
      "Overhead of dependency array checking.",
      "Often used prematurely where not needed.",
    ],
    whenToUse: [
      "Passing functions to optimized child components (React.memo)",
      "When a function is a dependency of useEffect",
      "Preventing infinite loops in effects dependent on functions",
    ],
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
