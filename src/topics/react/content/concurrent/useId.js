import { lazy } from "react";
import { Hash } from "lucide-react";

const UseIdDemo = lazy(() => import("@/topics/react/components/UseIdDemo"));

export const useIdData = {
  id: "useid",
  icon: Hash,
  title: "useId",
  category: "concurrent",
  description: "Generate unique IDs that are stable across SSR",
  component: UseIdDemo,
  theory: {
    overview:
      "useId is a hook for generating unique IDs that can be passed to accessibility attributes.",
    deepDive:
      "Using `Math.random()` for IDs causes mismatches between Server Side Rendering (SSR) and Client Hydration, causing errors. `useId` ensures the ID generated on the server matches the client.",
    whenToUse: [
      "Linking input labels to inputs (htmlFor/id)",
      "ARIA attributes (aria-labelledby)",
    ],
    syntax: `const id = useId();
return (
  <>
    <label htmlFor={id}>Name</label>
    <input id={id} />
  </>
);`,
    tips: ["Do not use for generating keys in a list (use data IDs instead)"],
    commonPitfalls: ["Using it for CSS selectors (IDs might include colons)"],
  },
};
