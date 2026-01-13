import { lazy } from "react";
import { Layers } from "lucide-react";

const VirtualizationDemo = lazy(() =>
  import("@/topics/react/components/VirtualizationDemo")
);

export const virtualizationData = {
  id: "virtualization",
  icon: Layers,
  title: "Virtualization",
  category: "patterns",
  description: "Render large lists efficiently",
  component: VirtualizationDemo,
  theory: {
    overview:
      "A technique to render huge lists of data efficiently. Instead of creating DOM nodes for all 10,000 items, you only create the 10 items currently visible on screen. As you scroll, you recycle them.",
    definition:
      "Virtualization (or Windowing) is a technique that only renders a small subset of rows at any given time.",
    syntax: `// Using react-window
<FixedSizeList
  height={150}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {Row}
</FixedSizeList>`,
    realLifeScenario:
      "Social Media Feed (Twitter/Facebook). You can scroll forever. If they kept all previous posts in the DOM, your browser would crash after 10 minutes. They 'virtualize' the list, keeping only the visible tweets in memory/DOM.",
    pros: [
      "Constant memory usage regardless of list size.",
      "Silky smooth scrolling performance (60fps).",
      "Near-instant initial render.",
    ],
    cons: [
      "Ctrl+F (Browser Find) doesn't find off-screen items.",
      "Complexity with dynamic item heights.",
      "Accessibility can be tricky.",
    ],
    whenToUse: [
      "Lists with 100+ complex items or 1000+ simple items",
      "Infinite scroll feeds",
      "Tables with massive datasets",
    ],
    tips: [
      "Use libraries like `react-window` or `react-virtuality`",
      "Handle dynamic heights carefully (performance hit)",
    ],
    deepDive:
      "It calculates which items are visible based on scroll position and container height. It creates absolute-positioned divs for those items. It adds a big empty div to simulate the total scroll height.",
    commonPitfalls: [
      "Implementing it for small lists (premature optimization)",
      "Breaking accessibility (screen readers need to know total count)",
    ],
  },
};
