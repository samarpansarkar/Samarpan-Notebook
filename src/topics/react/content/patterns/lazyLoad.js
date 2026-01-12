import { lazy } from "react";
import { Package } from "lucide-react";

const LazyLoadDemo = lazy(() =>
  import("@/topics/react/components/LazyLoadExample")
);

export const lazyLoadData = {
  id: "lazy",
  icon: Package,
  title: "Code Splitting",
  category: "patterns",
  description: "Load components only when needed",
  component: LazyLoadDemo,
  theory: {
    overview:
      "React.lazy allows you to render a dynamic import as a regular component, reducing initial bundle size.",
    deepDive:
      "Modern bundlers (Vite/Webpack) can split your code into 'chunks'. `React.lazy` fetches the chunk over the network only when the component is actually rendered. `Suspense` handles the 'loading' state while the network request is pending.",
    whenToUse: [
      "Route-based code splitting (Page level)",
      "Heavy Visualization/Chart libraries",
      "Modals that aren't initially open",
    ],
    syntax: `const LazyComp = lazy(() => import('./Comp'));

<Suspense fallback={<Loading />}>
  <LazyComp />
</Suspense>`,
    tips: [
      "Wrap closest high-level parent in Suspense",
      "Reduces Time-to-Interactive (TTI)",
    ],
    commonPitfalls: [
      "Lazy loading small components (network overhead > download savings)",
    ],
  },
};
