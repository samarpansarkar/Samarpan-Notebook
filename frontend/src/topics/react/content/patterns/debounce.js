import { lazy } from "react";
import { Clock } from "lucide-react";

const DebounceDemo = lazy(() =>
  import("@/topics/react/components/DebounceDemo")
);

export const debounceData = {
  id: "debounce",
  icon: Clock,
  title: "Debouncing",
  category: "patterns",
  description: "Limit function execution rate",
  component: DebounceDemo,
  theory: {
    overview:
      "A technique to limit the rate at which a function fires. It ensures a time-consuming task (like an API call) only runs after the user has *stopped* doing an action (like typing) for a certain delay.",
    definition:
      "Debouncing forces a function to wait a certain amount of time before running. If the function is called again during that time, the timer resets.",
    syntax: `const debouncedSearch = debounce((query) => {
  api.search(query);
}, 500);

// Usage
<input onChange={(e) => debouncedSearch(e.target.value)} />`,
    realLifeScenario:
      "Search Autocomplete. Without debounce, searching for 'React' fires 5 API calls ('R', 'Re', 'Rea'...). With debounce (500ms), it waits until you stop typing and fires only 1 call for 'React'.",
    pros: [
      "Reduces server load (fewer API calls).",
      "Improves client performance (fewer renders).",
    ],
    cons: [
      "User sees results with a slight delay.",
      "Complexity in handling 'cleanup' (canceling pending timers).",
    ],
    whenToUse: [
      "Search inputs / Autocomplete",
      "Window resize/scroll event handlers",
      "Auto-saving forms",
    ],
    tips: [
      "Use cleanup to cancel timers on unmount",
      "Use Lodash.debounce or custom hook for simplicity",
    ],
    deepDive:
      "Debounce is different from Throttle. Throttle ensures function runs at most once every X ms (steady flow). Debounce waits for a pause in the pauses.",
    commonPitfalls: [
      "Creating the debounced function inside the render loop (it gets recreated, timer lost)",
      "Forgetting to persist the function with useCallback or useRef",
    ],
  },
};
