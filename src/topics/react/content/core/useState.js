import { lazy } from "react";
import { Box } from "lucide-react";

// Lazy Load Component
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
      "useState is a Hook that lets you add React state to function components.",
    deepDive:
      "When you call the set function, React schedules a re-render. State is preserved between these re-renders. If the new state is identical to the old state (Object.is comparison), React skips the re-render.",
    whenToUse: [
      "Managing local component state",
      "Toggling UI elements (modals, dropdowns)",
      "Storing form input values",
    ],
    syntax: `const [count, setCount] = useState(0);
// specific update
setCount(1);
// functional update (best for counters)
setCount(prev => prev + 1);`,
    tips: [
      "Use functional updates when new state depends on old state",
      "Initialize lazy state with a function if expensive",
    ],
    commonPitfalls: [
      "Mutating state directly (e.g. state.value = 5)",
      "Assuming state updates are synchronous (they are batched)",
    ],
  },
};
