import { lazy } from "react";
import { Terminal } from "lucide-react";

// Lazy Load Component
const UseDebugValueDemo = lazy(() =>
  import("@/topics/react/components/UseDebugValueDemo")
);

export const useDebugValueData = {
  id: "usedebugvalue",
  icon: Terminal,
  title: "useDebugValue",
  category: "advanced",
  description: "Display a label for custom hooks in React DevTools",
  component: UseDebugValueDemo,
  theory: {
    overview:
      "Can be used to display a label for custom hooks in React DevTools.",
    deepDive:
      "It has zero effect on the application logic. It's purely for developer experience. If you have a custom hook `useOnlineStatus`, you can make DevTools show 'Online' next to it instead of inspecting internal state.",
    whenToUse: [
      "Variables in custom hooks that describe the hook's status",
      "Library authors providing debug info",
    ],
    syntax: `useDebugValue(isOnline ? 'Online' : 'Offline');
// With formatter function (for expensive calc)
useDebugValue(date, date => date.toDateString());`,
    tips: ["Don't use in every hook; mostly useful for shared/library hooks"],
    commonPitfalls: ["Expecting it to render something in the DOM"],
  },
};
