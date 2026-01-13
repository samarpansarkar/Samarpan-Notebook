import { lazy } from "react";
import { Layout } from "lucide-react";

const UseLayoutEffectDemo = lazy(() =>
  import("@/topics/react/components/UseLayoutEffectDemo")
);

export const useLayoutEffectData = {
  id: "uselayouteffect",
  icon: Layout,
  title: "useLayoutEffect",
  category: "advanced",
  description: "Fire effects before painting",
  component: UseLayoutEffectDemo,
  theory: {
    overview:
      "A version of `useEffect` that fires synchronously after all DOM mutations but *before* the browser paints the screen. It's used to measure layout or make DOM changes without causing visual flickers.",
    definition:
      "useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.",
    syntax: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);`,
    realLifeScenario:
      "Positioning a tooltip. You need to render the tooltip, measure its height, and then adjust its top/left position. If you use `useEffect`, the user sees the tooltip jump (flicker). With `useLayoutEffect`, the adjustment happens before the user sees the first frame.",
    pros: [
      "Prevents visual flickers for DOM measurements.",
      "Synchronous update ensures style consistency.",
    ],
    cons: [
      "Blocks visual updates (can hurt performance).",
      "Delays First Contentful Paint.",
    ],
    whenToUse: [
      "Measuring DOM elements (width, height, position)",
      "Animating layout changes synchronously",
      "Preventing visual flickers (FOUC)",
    ],
    tips: [
      "Start with useEffect; switch to useLayoutEffect only if it flickers",
      "SSR warning: doesn't run on server (leads to hydration mismatch)",
    ],
    deepDive:
      "Normal useEffect runs incorrectly for layout measurements because the browser might have already painted. useLayoutEffect blocks the painting process until your code finishes.",
    commonPitfalls: [
      "Using it for data fetching (blocks the UI unnecessarily)",
      "Ignoring SSR warnings (needs a shim for server)",
    ],
  },
};
