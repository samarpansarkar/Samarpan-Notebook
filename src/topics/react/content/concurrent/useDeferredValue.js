import { lazy } from "react";
import { Server } from "lucide-react";

// Lazy Load Component
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
      "Accepts a value and returns a new copy of the value that will defer to more urgent updates.",
    deepDive:
      "Similar to useTransition, but wraps a *value* instead of a function. It tells React: 'You can use the old value for a bit while you calculate the new UI with the new value'. Useful when you receive new props but want to keep the old UI responsive.",
    whenToUse: [
      "When you don't control the state setter (e.g. props from parent)",
      "Deferring re-rendering of a heavy part of the tree",
      "Typeahead or search results",
    ],
    syntax: `const deferredValue = useDeferredValue(value);
      
return (
  <Suspense fallback={<Spinner />}>
    <HeavyList query={deferredValue} />
  </Suspense>
);`,
    tips: [
      "Pair with Memoized components for best results",
      "Can trigger Suspense boundaries",
    ],
    commonPitfalls: [
      "Using with fixed delays (it's not setTimeout, it's adaptive to device speed)",
    ],
  },
};
