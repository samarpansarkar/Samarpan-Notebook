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
  description: "Customize the instance value exposed to parent refs",
  component: UseImperativeHandleDemo,
  theory: {
    overview:
      "Customizes the instance value that is exposed to parent components when using `forwardRef`.",
    deepDive:
      "Usually, you don't want to expose the *entire* DOM node to a parent (encapsulation). This hook lets you return a custom object with only specific methods (like `focus()` or `reset()`) instead of the raw DOM node.",
    whenToUse: [
      "When you need to imperatively trigger functions in a child (e.g. `modalRef.current.open()`)",
      "Library authors designing strict APIs",
    ],
    syntax: `useImperativeHandle(ref, () => ({
  focus: () => {
    inputRef.current.focus();
  }
}));`,
    tips: [
      "Avoid using refs for data flow; prefer props",
      "Must be used with `forwardRef`",
    ],
    commonPitfalls: [
      "Overusing imperative code in a declarative library (React)",
    ],
  },
};
