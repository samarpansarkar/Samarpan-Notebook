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
  description: "Global state management",
  component: UseContextDemo,
  theory: {
    overview:
      "Enables you to subscribe to React Context without introducing nesting. It allows you to share data (like user auth, theme, or language) across the component tree without manually passing props at every level.",
    definition:
      "useContext is a hook that accepts a context object (the value returned from React.createContext) and returns the current context value for that context.",
    syntax: `const ThemeContext = createContext("light");
// In child
const theme = useContext(ThemeContext);`,
    realLifeScenario:
      "Theming your app. You wrap the entire app in a `<ThemeProvider>`. Any button or card deep in the tree can call `useContext(ThemeContext)` to decide if it should be dark mode or light mode, without passing `isDarkMode` through 10 layers of components.",
    pros: [
      "Solving Prop Drilling.",
      "Simplifies code by removing explicit prop passing.",
      "Great for global settings (Theme, Auth, Language).",
    ],
    cons: [
      "Makes components less reusable (dependent on context).",
      "Can cause performance issues if value changes often (re-renders all consumers).",
    ],
    whenToUse: [
      "Theming (Dark/Light mode)",
      "User Authentication state",
      "Global settings/Locales",
    ],
    tips: [
      "Split contexts to avoid unnecessary re-renders",
      "Combine with useReducer for complex global state",
    ],
    deepDive:
      "When the Context Provider updates, all components calling useContext with that context will re-render. React optimizes this to traverse up the tree to find the provider.",
    commonPitfalls: [
      "Overusing context (makes components harder to reuse)",
      "Updating context value too frequently (performance hit)",
    ],
  },
};
