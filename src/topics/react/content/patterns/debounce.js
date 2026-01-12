import { lazy } from "react";
import { Clock } from "lucide-react";

// Lazy Load Component
const DebounceDemo = lazy(() =>
  import("@/topics/react/components/DebounceDemo")
);

export const debounceData = {
  id: "debounce",
  icon: Clock,
  title: "Debouncing",
  category: "patterns",
  description: "Limit the rate at which a function fires",
  component: DebounceDemo,
  theory: {
    overview:
      "Debouncing ensures that a function is not called until a certain amount of time has passed since the last call.",
    deepDive:
      "Crucial for network optimization. If a user types 60wpm, you don't want 300 API calls. Debouncing waits for the user to 'stop' (pause) for N ms before firing.",
    whenToUse: [
      "Search inputs triggering API calls",
      "Window resize event handlers",
      "Form validation on typing",
    ],
    syntax: `const debouncedValue = useDebounce(value, 500);
      
useEffect(() => {
    // API Call
}, [debouncedValue]);`,
    tips: ["Use a custom hook for reuse", "Clean up timeouts in useEffect"],
    commonPitfalls: [
      "Implementing directly inside render without useCallback (timer gets recreated/cleared constantly)",
    ],
  },
};
