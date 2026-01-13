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
      "A concurrency hook that lets you mark state updates as 'transitions'. This tells React that these updates are low priority and can be interrupted by high-priority updates (like typing), keeping the UI responsive.",
    definition:
      "useTransition is a React Hook that lets you update the state without blocking the UI.",
    syntax: `const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(() => {
    // Low priority update
    setTab("photos");
  });
};`,
    realLifeScenario:
      "Switching tabs in a dashboard where the 'Analytics' tab takes 2 seconds to render. Without transition, the interface freezes for 2s. With `useTransition`, the user clicks, the UI stays responsive (maybe showing a spinner), and the tab switches only when the data is ready.",
    pros: [
      "Keeps the app responsive during heavy render tasks.",
      "Built-in loading state (`isPending`).",
      "Allows user to interrupt slow renders.",
    ],
    cons: [
      "Only works for state updates (not async callbacks).",
      "Cannot use for controlled inputs (inputs must update synchronously).",
    ],
    whenToUse: [
      "Rendering large lists or charts based on user input",
      "Navigation between expensive views",
      "Non-urgent UI updates",
    ],
    tips: [
      "Don't use for text inputs (typing should be sync)",
      "Wrap multiple state updates in one startTransition",
    ],
    deepDive:
      "Transitions are concurrent updates. If the user types while a transition is calculating, React pauses the transition, processes the keystroke (urgent), and then resumes the transition.",
    commonPitfalls: [
      "Wrapping async/fetch calls (startTransition expects sync code)",
      "Using it for every state update (overhead)",
    ],
  },
};
