import { lazy } from "react";
import { MousePointer } from "lucide-react";

const UseRefDemo = lazy(() => import("@/topics/react/components/UseRefDemo"));

export const useRefData = {
  id: "useref",
  icon: MousePointer,
  title: "useRef",
  category: "core",
  description: "Access DOM or mutable values",
  component: UseRefDemo,
  theory: {
    overview:
      "A hook that acts like an 'escape hatch' to access DOM elements directly or store mutable values that don't trigger re-renders. Think of it as a class instance variable for functional components.",
    definition:
      "useRef returns a mutable ref object whose `.current` property is initialized to the passed argument. The returned object persists for the full lifetime of the component.",
    syntax: `const inputRef = useRef(null);
// Access DOM
inputRef.current.focus();
// Mutable value without re-render
const count = useRef(0);`,
    realLifeScenario:
      "Auto-focusing an input field when a modal opens. You create `inputRef`, attach it to the `<input ref={inputRef} />`, and call `inputRef.current.focus()` inside a `useEffect`.",
    pros: [
      "Persists values without triggering re-renders.",
      "Direct access to DOM nodes for imperative APIs.",
      "Great for storing 'previous' state values.",
    ],
    cons: [
      "Changes to `.current` are not reactive (no UI update).",
      "Overuse can lead to imperative, non-React patterns.",
    ],
    whenToUse: [
      "Accessing DOM elements (focus, scroll)",
      "Storing mutable values that don't need re-renders",
      "Caching values from previous renders",
    ],
    tips: [
      "Don't read/write ref.current during rendering",
      "Ref content changes do not notify you",
    ],
    deepDive:
      "Updating a ref is a side effect. It should be done inside useEffect or event handlers, not during rendering. React doesn't know when you change a ref, so it won't update the UI.",
    commonPitfalls: [
      "Trying to use refs for data flow (use state/props instead)",
      "Accessing refs before the component mounts (null check needed)",
    ],
  },
};
