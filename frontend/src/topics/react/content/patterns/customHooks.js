import { lazy } from "react";
import { Activity } from "lucide-react";

const CustomHooksDemo = lazy(() =>
  import("@/topics/react/components/CustomHooksDemo")
);

export const customHooksData = {
  id: "custom-hooks",
  icon: Activity,
  title: "Custom Hooks",
  category: "patterns",
  description: "Extracting reusable logic",
  component: CustomHooksDemo,
  theory: {
    overview:
      "A powerful pattern to extract component logic into reusable functions. If two components need to share the same logic (like fetching data or listening to window size), you can extract it into a custom hook.",
    definition:
      "A custom hook is a JavaScript function whose name starts with 'use' and that may call other Hooks.",
    syntax: `function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => { ... }, []);
  return size;
}`,
    realLifeScenario:
      "Form handling. Instead of repeating `value`, `onChange`, `error` state logic in every form component, create a `useForm` hook that handles validation and state updates, returning `{ values, handleChange, errors, handleSubmit }`.",
    pros: [
      "DRY (Don't Repeat Yourself) code.",
      "Separates UI (Component) from Logic (Hook).",
      "Highly testable.",
    ],
    cons: [
      "Can hide complexity if over-abstracted.",
      "Must follow Rule of Hooks (no conditional usage).",
    ],
    whenToUse: [
      "Sharing logic between components",
      "Separating complex logic from view",
      "Hiding implementation details of libraries",
    ],
    tips: ["Always start with 'use'", "Treat them like components without UI"],
    deepDive:
      "Custom hooks are just functions. They share logic, but NOT state. If you use the same hook in two components, they each get their own isolated state.",
    commonPitfalls: [
      "Thinking state is shared between components (it's not)",
      "Breaking rules of hooks inside the custom hook",
    ],
  },
};
