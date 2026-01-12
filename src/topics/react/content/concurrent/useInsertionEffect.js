import { lazy } from "react";
import { Layers } from "lucide-react";

// Lazy Load Component
const UseInsertionEffectDemo = lazy(() =>
  import("@/topics/react/components/UseInsertionEffectDemo")
);

export const useInsertionEffectData = {
  id: "useinsertioneffect",
  icon: Layers,
  title: "useInsertionEffect",
  category: "concurrent",
  description: "CSS-in-JS injection before DOM mutations",
  component: UseInsertionEffectDemo,
  theory: {
    overview:
      "Fires before any DOM mutations. Intended for CSS-in-JS libraries to inject styles.",
    deepDive:
      "It runs even before `useLayoutEffect`. It solves a performance bottleneck where injecting styles *during* layout caused browser style recalculations. By doing it before, React ensures styles are ready before correct layout is calculated.",
    whenToUse: [
      "ONLY for authors of CSS-in-JS libraries (styled-components, emotion)",
    ],
    syntax: `useInsertionEffect(() => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}, [css]);`,
    tips: [
      "You probably don't need this hook unless you are building a library",
    ],
    commonPitfalls: ["Trying to access refs (they are not attached yet)"],
  },
};
