import { lazy } from "react";
import { Activity } from "lucide-react";

const CustomHooksDemo = lazy(() =>
  import("@/topics/react/components/CustomHooksDemo")
);

export const customHooksData = {
  id: "custom-hooks",
  icon: Activity,
  title: "Custom Hooks",
  category: "patterns",
  description: "Extracting reusable component logic",
  component: CustomHooksDemo,
  theory: {
    overview:
      "A custom hook is a JavaScript function whose name starts with 'use' and that may call other Hooks.",
    deepDive:
      "React hooks are just functions. You can compose them. If you find yourself duplicating logic (e.g. fetching data, managing form state) across components, extract it into a custom hook. This keeps components clean and declarative.",
    whenToUse: [
      "Sharing stateful logic between components",
      "Complex logic abstraction",
      "API layers",
    ],
    syntax: `function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
     // ... listener logic
  }, []);
  return size;
}`,
    tips: [
      "Always start name with 'use'",
      "Treat them as unit-testable blocks of logic",
    ],
    commonPitfalls: [
      "Conditionals inside the custom hook that break Rules of Hooks",
    ],
  },
};
