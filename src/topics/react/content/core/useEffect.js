import { lazy } from "react";
import { RefreshCw } from "lucide-react";

const UseEffectDemo = lazy(() =>
  import("@/topics/react/components/UseEffectDemo")
);

export const useEffectData = {
  id: "useeffect",
  icon: RefreshCw,
  title: "useEffect",
  category: "core",
  description: "Synchronize a component with an external system",
  component: UseEffectDemo,
  theory: {
    overview: "useEffect lets you perform side effects in function components.",
    deepDive:
      "Passes a function that will run after the render is committed to the screen. React compares values in the dependency array to decide if it should re-run. If the array is empty [], it runs only on mount. If omitted, it runs on every render.",
    whenToUse: [
      "Data fetching",
      "Subscribing to events (window resize, sockets)",
      "Manually changing the DOM (document.title)",
    ],
    syntax: `useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  // Cleanup function (runs before re-running effect or unmount)
  return () => connection.disconnect();
}, [dependency]);`,
    tips: [
      "Always include all used variables in the dependency array",
      "Return a cleanup function to avoid memory leaks",
    ],
    commonPitfalls: [
      "Missing dependencies (stale closures)",
      "Fetching data without a cleanup/ignore flag (race conditions)",
    ],
  },
};
