import { lazy } from "react";
import { Box } from "lucide-react";

const UseStateDemo = lazy(() =>
  import("@/topics/react/components/UseStateDemo")
);

export const useStateData = {
  id: "usestate",
  icon: Box,
  title: "useState",
  category: "core",
  description: "Add local state to functional components",
  component: UseStateDemo,
  theory: {
    overview:
      "The most fundamental hook for managing state in functional components. It allows you to store and update values that persist across re-renders and trigger UI updates when changed.",
    definition:
      "useState is a React Hook that lets you add state variables to functional components. It returns an array with two elements: the current state value and a function to update it.",
    syntax: `const [count, setCount] = useState(0);
// specific update
setCount(1);
// functional update (best for counters)
setCount(prev => prev + 1);`,
    realLifeScenario:
      "A classic use case is a 'counter' or a 'form input'. Imagine a signup form where you need to track what the user types into 'email' and 'password' fields. Every keystroke updates the localized state, and React re-renders the input to show the new character.",
    pros: [
      "Simple and easy to use for local state.",
      "Preserves values between renders.",
      "Triggers re-renders automatically when updated.",
    ],
    cons: [
      "Not suitable for complex global state (leads to prop drilling).",
      "Stale closures can occur if dependencies aren't managed.",
    ],
    whenToUse: [
      "Managing local component state",
      "Toggling UI elements (modals, dropdowns)",
      "Storing form input values",
    ],
    tips: [
      "Use functional updates when new state depends on old state",
      "Initialize lazy state with a function if expensive",
    ],
    deepDive:
      "When you call the set function, React schedules a re-render. State is preserved between these re-renders. If the new state is identical to the old state (Object.is comparison), React skips the re-render.",
    commonPitfalls: [
      "Mutating state directly (e.g. state.value = 5)",
      "Assuming state updates are synchronous (they are batched)",
    ],
  },
};
