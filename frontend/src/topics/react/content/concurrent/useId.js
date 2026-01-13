import { lazy } from "react";
import { Hash } from "lucide-react";

const UseIdDemo = lazy(() => import("@/topics/react/components/UseIdDemo"));

export const useIdData = {
  id: "useid",
  icon: Hash,
  title: "useId",
  category: "concurrent",
  description: "Generate unique IDs for accessibility",
  component: UseIdDemo,
  theory: {
    overview:
      "A hook for generating unique IDs that are stable across server and client, primarily for accessibility attributes (like `aria-labelledby`). It solves the hydration mismatch issue caused by using random numbers for IDs.",
    definition:
      "useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.",
    syntax: `const id = useId();
return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} type="email" />
  </>
);`,
    realLifeScenario:
      "Creating an accessible form component used multiple times on a page. Each instance needs a unique ID linking `label` to `input`. `useId` ensures `id='input-1'` on server matches `id='input-1'` on client, avoiding hydration errors.",
    pros: [
      "Prevents server/client ID mismatch errors.",
      "Ensures accessibility compliance easily.",
      "No external counters needed.",
    ],
    cons: [
      "Not useful for generating CSS selectors or map keys.",
      "Cannot be used to generate keys in a loop.",
    ],
    whenToUse: [
      "Connecting labels to inputs (htmlFor)",
      "ARIA relationships (aria-labelledby, aria-describedby)",
      "Generating unique SVG filter IDs",
    ],
    tips: [
      "Use for accessibility attributes, NOT for list keys",
      "Append text for multiple IDs in one component (`${id}-name`)",
    ],
    deepDive:
      "It generates a tree-structure aware ID (e.g., :r1:, :r2:) which is consistent during hydration. Old methods like Math.random() cause mismatches; Global counters fail in concurrent mode.",
    commonPitfalls: [
      "Using it for 'key' props in lists map()",
      "Using it to select DOM elements via querySelector",
    ],
  },
};
