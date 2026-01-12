import { lazy } from "react";
import { Wifi } from "lucide-react";

const UseSyncExternalStoreDemo = lazy(() =>
  import("@/topics/react/components/UseSyncExternalStoreDemo")
);

export const useSyncExternalStoreData = {
  id: "usesyncexternalstore",
  icon: Wifi,
  title: "useSyncExternalStore",
  category: "concurrent",
  description: "Subscribe to external stores",
  component: UseSyncExternalStoreDemo,
  theory: {
    overview:
      "Designed for library authors to subscribe to external data sources (like Redux, Zustand, or browser APIs). It ensures consistent snapshots during concurrent rendering, preventing 'tearing'.",
    definition:
      "useSyncExternalStore is a React Hook that lets you subscribe to an external store.",
    syntax: `const state = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot // Optional (for SSR)
);`,
    realLifeScenario:
      "Subscribing to current browser window size or online status. The `window.navigator.onLine` is an external mutable source. `useSyncExternalStore` allows React components to reactively update when this external value changes, without tearing.",
    pros: [
      "Fixes tearing issues in concurrent mode.",
      "Standard API for all external state libraries.",
      "SSR support via getServerSnapshot.",
    ],
    cons: [
      "Complex API, mostly for library authors.",
      "Snapshots must be immutable/consistent.",
    ],
    whenToUse: [
      "Subscribing to external stores (Redux, Zustand)",
      "Browser APIs (navigator, window resize)",
      "Legacy non-React state integration",
    ],
    tips: [
      "getSnapshot result must be cached/stable",
      "Usually hidden inside custom hooks (useOnlineStatus)",
    ],
    deepDive:
      "Replaces the old pattern of useEffect + useState for external subscriptions. It forces synchronous updates for external stores to ensure the UI doesn't show inconsistent state (tearing) during a concurrent render.",
    commonPitfalls: [
      "Passing a new getSnapshot function every render (causes infinite loops)",
      "Using it for local React state (redundant)",
    ],
  },
};
