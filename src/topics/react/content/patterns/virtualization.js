import { lazy } from "react";
import { Layers } from "lucide-react";

// Lazy Load Component
const VirtualizationDemo = lazy(() =>
  import("@/topics/react/components/VirtualizationDemo")
);

export const virtualizationData = {
  id: "virtualization",
  icon: Layers,
  title: "List Virtualization",
  category: "patterns",
  description: "Render only visible items in large lists",
  component: VirtualizationDemo,
  theory: {
    overview:
      "Virtualization renders only the visible portion of a large list (windowing).",
    deepDive:
      "DOM nodes are heavy memory consumers. A list of 10,000 items creates 10,000 <div>s. Virtualization only creates the ~10 <div>s currently on screen + a buffer. As you scroll, it recycles these nodes or unmounts old ones, simulating a large scroll height with a fake spacer container.",
    whenToUse: [
      "Lists with 100+ items that are complex",
      "Infinite scroll feeds (Facebook/Twitter style)",
      "Data Grid/Tables with thousands of rows",
    ],
    syntax: `// Using react-window
<FixedSizeList itemCount={1000} height={500} ...>
  {RowComponent}
</FixedSizeList>`,
    tips: [
      "Use established libraries (virtuoso, react-window)",
      "Only works if you can calculate or know item heights",
    ],
    commonPitfalls: [
      "Trying to implement from scratch (very hard to handle scroll jank/edge cases)",
    ],
  },
};
