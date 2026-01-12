import { lazy } from "react";
import { Database } from "lucide-react";

const UseReducerDemo = lazy(() =>
  import("@/topics/react/components/UseReducerDemo")
);

export const useReducerData = {
  id: "usereducer",
  icon: Database,
  title: "useReducer",
  category: "core",
  description: "Complex state logic management",
  component: UseReducerDemo,
  theory: {
    overview:
      "An alternative to `useState` for managing more complex state logic involves multiple sub-values or when the next state depends on the previous one. It follows the Redux pattern of dispatching actions.",
    definition:
      "useReducer is a React Hook that manages complex state logic in React applications. It accepts a reducer function of type `(state, action) => newState`, and returns the current state accompanied by a dispatch method.",
    syntax: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return {count: state.count + 1};
    default: throw new Error();
  }
}`,
    realLifeScenario:
      "Managing a shopping cart. A cart has many actions: 'ADD_ITEM', 'REMOVE_ITEM', 'UPDATE_QUANTITY', 'CLEAR_CART'. Using `useReducer` keeps all this logic centralized in one reducer function rather than scattered `useState` updaters.",
    pros: [
      "Centralizes complex state update logic.",
      "Easier to test (reducer is a pure function).",
      "Pass `dispatch` down instead of multiple callbacks.",
    ],
    cons: [
      "More boilerplate code than `useState`.",
      "Overkill for simple boolean toggles or counters.",
    ],
    whenToUse: [
      "Complex state logic with multiple sub-values",
      "State updates depend on complex interactions",
      "Optimization for deep component trees (passing dispatch)",
    ],
    tips: [
      "Use for complex forms with validation logic",
      "Switch to useReducer when useState gets messy",
    ],
    deepDive:
      "React guarantees that dispatch function identity is stable and won't change on re-renders. This makes it safe to omit from useEffect or useCallback dependency lists.",
    commonPitfalls: [
      "Overusing it for simple state (adds complexity)",
      "Mutating state in the reducer instead of returning new objects",
    ],
  },
};
