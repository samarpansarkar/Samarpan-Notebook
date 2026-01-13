import { useTransitionData } from "@/topics/react/content/concurrent/useTransition";
import { useDeferredValueData } from "@/topics/react/content/concurrent/useDeferredValue";
import { useIdData } from "@/topics/react/content/concurrent/useId";
import { useSyncExternalStoreData } from "@/topics/react/content/concurrent/useSyncExternalStore";
import { useInsertionEffectData } from "@/topics/react/content/concurrent/useInsertionEffect";

export const concurrentHooks = [
  useTransitionData,
  useDeferredValueData,
  useIdData,
  useSyncExternalStoreData,
  useInsertionEffectData,
];
