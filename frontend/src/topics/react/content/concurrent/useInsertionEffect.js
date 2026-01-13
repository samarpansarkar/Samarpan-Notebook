import { lazy } from "react";
import { Layers } from "lucide-react";

const UseInsertionEffectDemo = lazy(() =>
  import("@/topics/react/components/UseInsertionEffectDemo")
);

export const useInsertionEffectData = {
  id: "useinsertioneffect",
  icon: Layers,
  title: "useInsertionEffect",
  category: "concurrent",
  description: "CSS-in-JS injection helper",
  component: UseInsertionEffectDemo,
  theory: {
    overview:
      "A specialized hook specifically for CSS-in-JS libraries. It runs *before* any DOM mutations, allowing libraries to inject dynamic styles just before the browser calculates layout, preventing layout thrashing.",
    definition:
      "useInsertionEffect is a version of useEffect that fires before any DOM mutations.",
    syntax: `useInsertionEffect(() => {
  const style = document.createElement('style');
  style.textContent = \`
    .dynamic { color: red; }
  \`;
  document.head.appendChild(style);
}, []);`,
    realLifeScenario:
      "You are writing a library like `styled-components` or `emotion`. When a component renders, you need to calculate hash-based class names and inject a `<style>` tag. Doing this in `useEffect` causes a flicker. `useInsertionEffect` does it instantly before the paint.",
    pros: [
      "Prevents layout thrashing/recalc styles.",
      "Optimized for style injection.",
    ],
    cons: [
      "Extremely niche (library authors only).",
      "Cannot access refs (DOM doesn't exist yet/not updated).",
    ],
    whenToUse: [
      "Injecting dynamic <style> tags",
      "CSS-in-JS library implementation",
    ],
    tips: [
      "Don't use for general side effects",
      "You probably don't need this unless building a styling lib",
    ],
    deepDive:
      "Timing: Render -> useInsertionEffect -> DOM Update -> implementation -> useLayoutEffect -> Paint -> useEffect. It fills the gap for inserting styles before layout is measured.",
    commonPitfalls: [
      "Trying to access refs or DOM elements (too early)",
      "Using it for data fetching or subscriptions",
    ],
  },
};
