import { lazy } from "react";
import { Terminal } from "lucide-react";

const UseDebugValueDemo = lazy(() =>
  import("@/topics/react/components/UseDebugValueDemo")
);

export const useDebugValueData = {
  id: "usedebugvalue",
  icon: Terminal,
  title: "useDebugValue",
  category: "advanced",
  description: "Label custom hooks in DevTools",
  component: UseDebugValueDemo,
  theory: {
    overview:
      "A hook used within custom hooks to display a readable label in the React DevTools. It helps you understand what's happening inside your custom hook without `console.log`.",
    definition:
      "useDebugValue is a React Hook that lets you display a label for custom hooks in React DevTools.",
    syntax: `useDebugValue(isOnline ? 'Online' : 'Offline');
// With formatter function
useDebugValue(date, date => date.toDateString());`,
    realLifeScenario:
      "Debugging a `useOnlineStatus` hook. Instead of seeing strict boolean 'true/false' in DevTools, you can use `useDebugValue(isOnline ? '🟢 Connected' : '🔴 Disconnected')` to see a nice status indicator next to the hook name.",
    pros: [
      "Improves debugging experience for fellow developers.",
      "Low overhead (formatter function only runs when DevTools is open).",
    ],
    cons: [
      "No effect on the actual application UI or logic.",
      "Only useful if you use React DevTools.",
    ],
    whenToUse: [
      "Building shared library hooks",
      "Complex internal state in custom hooks that needs explanation",
      "Debugging session",
    ],
    tips: [
      "Pass a formatting function as the second argument to avoid slow calculations",
      "Don't use it in every hook; only where it adds value",
    ],
    deepDive:
      "It has zero impact on your production app. If the DevTools extension isn't open, the code inside the formatter function never runs.",
    commonPitfalls: [
      "Expecting it to render something on page (it's DevTools only)",
    ],
  },
};
