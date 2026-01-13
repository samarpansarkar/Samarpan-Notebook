import { lazy } from "react";
import { Package } from "lucide-react";

const LazyLoadDemo = lazy(() =>
  import("@/topics/react/components/LazyLoadExample")
);

export const lazyLoadData = {
  id: "lazy-loading",
  icon: Package,
  title: "Lazy Loading",
  category: "patterns",
  description: "Code splitting and suspension",
  component: LazyLoadDemo,
  theory: {
    overview:
      "A design pattern that defers the loading of non-critical resources (like images or code components) until they are actually needed. In React, this usually means `React.lazy` and `Suspense`.",
    definition:
      "Lazy loading is the practice of delaying load or initialization of resources or objects until the point at which they are needed to improve performance and save system resources.",
    syntax: `const Profile = lazy(() => import('./Profile'));

// Usage
<Suspense fallback={<Spinner />}>
  <Profile />
</Suspense>`,
    realLifeScenario:
      "A dashboard with a heavy 'Admin Panel' that only 1% of users see. Instead of shipping that code to everyone, you 'lazy load' it. The byte size of the initial bundle drops, making the site load faster for the 99% who never visit Admin.",
    pros: [
      "Faster initial load time (smaller bundle).",
      "Saves bandwidth for users.",
    ],
    cons: [
      "User waits when navigating to the lazy part (needs spinner).",
      "Complexity with layout shifts or loading states.",
    ],
    whenToUse: [
      "Route-based code splitting (Pages)",
      "Heavy components (Charts, Maps, Editors) not immediately visible",
      "Modals/Dialogs that open on interaction",
    ],
    tips: [
      "Wrap routes in Suspense",
      "Use meaningful loading skeletons instead of blank screens",
    ],
    deepDive:
      "Webpack/Vite sees the dynamic `import()` and creates a separate 'chunk' file. React `Suspense` manages the UI state (showing fallback) while that network request fetches the chunk.",
    commonPitfalls: [
      "Lazy loading everything (too many network requests)",
      "Lazy loading above the fold content (causes layout shift/LCP issues)",
    ],
  },
};
