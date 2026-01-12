import { lazy } from "react";
import { Users } from "lucide-react";

const UseContextDemo = lazy(() =>
  import("@/topics/react/components/UseContextDemo")
);

export const useContextData = {
  id: "usecontext",
  icon: Users,
  title: "useContext",
  category: "core",
  description: "Consume context values without nesting",
  component: UseContextDemo,
  theory: {
    overview:
      "Accepts a context object (the value returned from React.createContext) and returns the current context value.",
    deepDive:
      "It lets you essentially 'teleport' data to any component in the tree without prop drilling. When the nearest <Provider> updates, this hook triggers a re-render with the latest value.",
    whenToUse: [
      "Global state (User, Theme, Language)",
      "Avoiding prop drilling through many layers",
    ],
    syntax: `const value = useContext(MyContext);`,
    tips: [
      "Split contexts to avoid unnecessary re-renders (see Patterns)",
      "Don't overuse; it makes components harder to reuse",
    ],
    commonPitfalls: [
      "Updating the Provider value with a new object every render (forces all consumers to update)",
    ],
  },
};
