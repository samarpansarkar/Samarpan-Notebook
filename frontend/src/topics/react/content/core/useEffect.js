import { lazy } from "react";
import { RefreshCw } from "lucide-react";

const UseEffectDemo = lazy(() =>
  import("@/topics/react/components/UseEffectDemo")
);

export const useEffectData = {
  id: "useeffect",
  icon: RefreshCw,
  title: "useEffect",
  category: "core",
  description: "Handle side effects in components",
  component: UseEffectDemo,
  theory: {
    overview:
      "The primary hook for handling side effects like data fetching, subscriptions, or manual DOM manipulations. It serves as a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.",
    definition:
      "useEffect is a Hook that allows you to perform side effects in function components. It accepts a function that contains imperative, possibly effectful code.",
    syntax: `useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Cleanup
    subscription.unsubscribe();
  };
}, [props.source]); // Dependency array`,
    realLifeScenario:
      "Fetching user data from an API when a profile component loads. You use `useEffect` with an empty dependency array `[]` to trigger the fetch once on mount. If the user ID changes, you put `userId` in the dependency array to re-fetch.",
    pros: [
      "Unifies lifecycle methods into a single API.",
      "Handles cleanup logic neatly via the return function.",
      " Declarative handling of dependencies.",
    ],
    cons: [
      "Easy to create infinite loops if dependencies are wrong.",
      "Complex logic can become hard to read (consider custom hooks).",
    ],
    whenToUse: [
      "Data fetching (API calls)",
      "Setting up subscriptions/event listeners",
      "Manual DOM updates",
    ],
    tips: [
      "Always include all used variables in the dependency array",
      "Use cleanup functions to prevent memory leaks",
    ],
    deepDive:
      "Effects run after every render by default. The dependency array acts as an optimization: React only re-runs the effect if one of the dependencies has changed. The cleanup function runs before the component unmounts and before re-running the effect.",
    commonPitfalls: [
      "Missing dependencies causing stale closures",
      "infinite loops by updating state in effect without proper conditions",
    ],
  },
};
