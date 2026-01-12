import { lazy } from "react";
import { Layout } from "lucide-react";

// Lazy Load Component
const UseLayoutEffectDemo = lazy(() =>
  import("@/topics/react/components/UseLayoutEffectDemo")
);

export const useLayoutEffectData = {
  id: "uselayouteffect",
  icon: Layout,
  title: "useLayoutEffect",
  category: "advanced",
  description: "Fires synchronously after DOM mutations",
  component: UseLayoutEffectDemo,
  theory: {
    overview:
      "Identical to useEffect, but fires synchronously after DOM mutations but before the browser paints.",
    deepDive:
      "useEffect runs *after* the paint, which is good for performance. useLayoutEffect blocks the paint. Use it when you need to measure the DOM (width/height/scroll) and immediately mutate it (e.g. tooltip positioning) to prevent visual flickering.",
    whenToUse: [
      "Measuring DOM elements (getBoundingClientRect)",
      "Animating layout (FLIP animations)",
      "preventing visual flashes/flickers",
    ],
    syntax: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);
}, []);`,
    tips: [
      "Prefer useEffect (99% of cases)",
      "Runs synchronously so it hurts Performance",
    ],
    commonPitfalls: [
      "Using for data fetching (blocks UI)",
      "Using extensively triggers jank",
    ],
  },
};
