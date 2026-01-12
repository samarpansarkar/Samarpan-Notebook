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
  description: "Subscribe to an external store",
  component: UseSyncExternalStoreDemo,
  theory: {
    overview:
      "A hook recommended for reading and subscribing from external data sources in a way that’s compatible with concurrent rendering features.",
    deepDive:
      "React 18's concurrent rendering (tearing) made it hard for external stores (Redux, MobX, global variables) to stay consistent. This hook enforces consistency by synchronously updating the UI if the store changes, preventing visual glitches.",
    whenToUse: [
      "Subscribing to browser APIs (navigator.onLine, window.innerWidth)",
      "Library authors (Redux, Zustand) implementing subscriptions",
    ],
    syntax: `const state = useSyncExternalStore(subscribe, getSnapshot);`,
    tips: [
      "Prefer built-in state/context if possible",
      "The snapshot function must return a stable value or it triggers infinite loops",
    ],
    commonPitfalls: ["Using it for simple local state"],
  },
};
