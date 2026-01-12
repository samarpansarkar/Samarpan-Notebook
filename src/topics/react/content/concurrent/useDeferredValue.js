import { lazy } from "react";
import { Server } from "lucide-react";

const UseDeferredValueDemo = lazy(() =>
  import("@/topics/react/components/UseDeferredValueDemo")
);

export const useDeferredValueData = {
  id: "usedeferredvalue",
  icon: Server,
  title: "useDeferredValue",
  category: "concurrent",
  description: "Defer updating a part of the UI",
  component: UseDeferredValueDemo,
  theory: {
    overview:
      "A hook that lets you defer re-rendering a non-urgent part of the tree. It is similar to debouncing or throttling, but integrated with React's rendering lifecycle, allowing it to 'lag behind' the main state safely.",
    definition:
      "useDeferredValue is a React Hook that lets you defer updating a part of the UI.",
    syntax: `const query = "text";
const deferredQuery = useDeferredValue(query);

// Use deferredQuery in slow components
<SlowList text={deferredQuery} />`,
    realLifeScenario:
      "A search bar filtering 5000 items. You want the input to update instantly as you type, but the list below can lag by a few milliseconds. Passing the `deferredQuery` to the list ensures the input remains snappy while the list catches up.",
    pros: [
      "Improves perceived performance for typing.",
      "Doesn't block the main thread (unlike blocking synchronous renders).",
      "Works automatically with Suspense.",
    ],
    cons: [
      "UI shows 'stale' content for a moment.",
      "Adds complexity to data flow.",
    ],
    whenToUse: [
      "Filtering large lists based on text input",
      "Rendering heavy visualizations updated by typing",
      "Performance optimization without manual debounce",
    ],
    tips: [
      "Combine with React.memo on the child component",
      "Use `isStale = value !== deferredValue` for loading styling",
    ],
    deepDive:
      "Unlike debounce (which waits for you to stop typing), useDeferredValue updates as fast as the computer can handle. If the device is fast, it updates instantly. If slow, it lags. It's adaptive.",
    commonPitfalls: [
      "Expecting it to prevent network requests (it's for rendering, not effects)",
      "Not memoizing the slow component (defeats the purpose)",
    ],
  },
};
