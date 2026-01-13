import { lazy } from "react";
import { MoreHorizontal } from "lucide-react";

const UseImperativeHandleDemo = lazy(() =>
  import("@/topics/react/components/UseImperativeHandleDemo")
);

export const useImperativeHandleData = {
  id: "useimperativehandle",
  icon: MoreHorizontal,
  title: "useImperativeHandle",
  category: "advanced",
  description: "Customize exposed ref values",
  component: UseImperativeHandleDemo,
  theory: {
    overview:
      "Allows you to customize the instance value that is exposed to parent components when using `forwardRef`. Instead of exposing the entire DOM node, you expose a limited set of methods.",
    definition:
      "useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.",
    syntax: `useImperativeHandle(ref, () => ({
  focus: () => {
    inputRef.current.focus();
  },
  scroll: () => {
    inputRef.current.scrollIntoView();
  }
}));`,
    realLifeScenario:
      "A video player component. You want the parent to control it (`play()`, `pause()`), but you don't want the parent to access the raw `<video>` tag and mess with other properties. `useImperativeHandle` lets you expose just `{ play, pause }`.",
    pros: [
      "Encapsulation: Hides internal DOM structure.",
      "Control: Exposes a clean, limited API.",
    ],
    cons: [
      "Encourages imperative code over declarative data flow.",
      "Makes components harder to predict.",
    ],
    whenToUse: [
      "Exposing parent-callable functions (play, pause, focus)",
      "Hiding internal DOM node implementation details",
      "Integrating with imperative libraries",
    ],
    tips: [
      "Use sparingly; prefer props for data flow",
      "Must be used with forwardRef",
    ],
    deepDive:
      "It essentially creates a bridge. The parent gets an object you defined, rather than the actual child instance or DOM node.",
    commonPitfalls: [
      "Forgetting forwardRef wrapper",
      "Overusing it instead of lifting state up",
    ],
  },
};
