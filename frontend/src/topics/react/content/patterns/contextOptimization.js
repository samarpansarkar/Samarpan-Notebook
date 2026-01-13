import { lazy } from "react";
import { Users } from "lucide-react";

const ContextOptimizationDemo = lazy(() =>
  import("@/topics/react/components/ContextOptimizationDemo")
);

export const contextOptimizationData = {
  id: "context-optimization",
  icon: Users,
  title: "Context Optimization",
  category: "patterns",
  description: "Preventing context re-renders",
  component: ContextOptimizationDemo,
  theory: {
    overview:
      "Optimizing Context performance to prevent unnecessary re-renders. A naïve Context implementation can cause the entire app to re-render whenever a single value changes.",
    definition:
      "Context Optimization refers to patterns (like splitting context or memoizing values) that reduce the number of components re-rendering when context updates.",
    syntax: `const ValueContext = createContext();
const DispatchContext = createContext();

// App
<ValueContext.Provider value={state}>
  <DispatchContext.Provider value={dispatch}>
    {children}
  </DispatchContext.Provider>
</ValueContext.Provider>`,
    realLifeScenario:
      "A global 'Settings' context. If you put 'Theme' (changes rarely) and 'MousePosition' (changes constantly) in the same Context, every time the mouse moves, the whole app re-renders (because Theme consumers also update). Splitting them into `ThemeContext` and `MousePosContext` fixes this.",
    pros: [
      "Drastically reduces re-renders.",
      "Keeps app performant even with global state.",
    ],
    cons: ["Increases boilerplate (more Providers).", "Complexity in setup."],
    whenToUse: [
      "High-frequency updates in Context",
      "Large component trees consuming context",
      "Separating static data/dispatchers from mutable data",
    ],
    tips: [
      "Split state and dispatch into separate contexts",
      "Use useMemo for the value passed to Provider",
    ],
    deepDive:
      "If the value passed to `Provider` is a new object every time `{ a: 1 }`, all consumers re-render. Memoizing it `useMemo(() => ({ a: 1 }), [])` prevents this only if the parent re-renders. Splitting Context is the ultimate fix.",
    commonPitfalls: [
      "Passing a new object literal directly to `value` prop",
      "Putting everything in one giant GlobalContext",
    ],
  },
};
