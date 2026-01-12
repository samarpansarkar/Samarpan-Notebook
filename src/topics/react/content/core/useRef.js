import { lazy } from "react";
import { MousePointer } from "lucide-react";

// Lazy Load Component
const UseRefDemo = lazy(() => import("@/topics/react/components/UseRefDemo"));

export const useRefData = {
  id: "useref",
  icon: MousePointer,
  title: "useRef",
  category: "core",
  description: "Persist values between renders without causing re-renders",
  component: UseRefDemo,
  theory: {
    overview:
      "Returns a mutable ref object whose .current property is initialized to the passed argument.",
    deepDive:
      "Refs are an escape hatch. Changing `ref.current` does NOT trigger a re-render. This makes them perfect for storing mutable data (timers, previous values) or accessing DOM nodes directly.",
    whenToUse: [
      "Accessing DOM elements (focus, scroll)",
      "Storing mutable variables (render counts, timer IDs)",
      "Storing previous state values for comparison",
    ],
    syntax: `const inputRef = useRef(null);
// Access: inputRef.current
// JSX: <input ref={inputRef} />`,
    tips: [
      "Do not read/write refs during rendering",
      "Ideal for 'instance variables'",
    ],
    commonPitfalls: [
      "Using refs for data that should trigger UI updates (use state instead)",
    ],
  },
};
