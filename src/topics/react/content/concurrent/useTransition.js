import { lazy } from "react";
import { Activity } from "lucide-react";

const UseTransitionDemo = lazy(() =>
  import("@/topics/react/components/UseTransitionDemo")
);

export const useTransitionData = {
  id: "usetransition",
  icon: Activity,
  title: "useTransition",
  category: "concurrent",
  description: "Update state without blocking the UI",
  component: UseTransitionDemo,
  theory: {
    overview:
      "useTransition is a React Hook that lets you update the state without blocking the UI.",
    deepDive:
      "It marks a state update as a 'Transition' (low priority). React will yield to the browser/user input (high priority) while calculating the transition update in the background. Once the calculation is done, it commits the DOM change. This keeps the UI responsive (e.g., typing) while heavy work happens.",
    whenToUse: [
      "Rendering large lists based on input filter",
      "Tab switching that involves heavy rendering",
      "Navigation transitions",
    ],
    syntax: `const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
    // Urgent: update input
    setInputValue(e.target.value);
    
    // Transition: update list
    startTransition(() => {
        setList(filterList(e.target.value));
    });
};`,
    tips: [
      "Check isPending to show a spinner or loading state",
      "Don't use for controlled inputs (typing needs to be urgent)",
    ],
    commonPitfalls: [
      "Using for everything: It adds overhead. Use only for CPU-bound updates.",
      "Assuming it debounces: It doesn't delay starting, it just yields execution.",
    ],
  },
};
