import { lazy } from "react";
import { Database } from "lucide-react";

// Lazy Load Component
const UseReducerDemo = lazy(() =>
  import("@/topics/react/components/UseReducerDemo")
);

export const useReducerData = {
  id: "usereducer",
  icon: Database,
  title: "useReducer",
  category: "core",
  description: "Manage complex state logic in a single place",
  component: UseReducerDemo,
  theory: {
    overview:
      "An alternative to useState that accepts a reducer of type (state, action) => newState.",
    deepDive:
      "Ideal for state that involves multiple sub-values or when the next state depends on the previous one. It also lets you optimize performance for components that trigger deep updates because you can pass `dispatch` down instead of callbacks.",
    whenToUse: [
      "Complex state logic (e.g. wizard forms, game state)",
      "When state depends on previous state in complex ways",
      "To avoid passing multiple callback props down a tree",
    ],
    syntax: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    default:
      throw new Error();
  }
}`,
    tips: ["Dispatch remains stable across renders", "Keep reducers pure"],
    commonPitfalls: [
      "Mutating state directly in reducer (always return new object)",
    ],
  },
};
