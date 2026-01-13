import { coreHooks } from "@/topics/react/modules/core";
import { advancedHooks } from "@/topics/react/modules/advanced";
import { concurrentHooks } from "@/topics/react/modules/concurrent";
import { customHooksData } from "@/topics/react/content/patterns/customHooks";
import { contextOptimizationData } from "@/topics/react/content/patterns/contextOptimization";
import { debounceData } from "@/topics/react/content/patterns/debounce";
import { lazyLoadData } from "@/topics/react/content/patterns/lazyLoad";
import { virtualizationData } from "@/topics/react/content/patterns/virtualization";
import { Zap, Layers } from "lucide-react";

const STUDY_SECTIONS = [
  {
    id: "hooks",
    title: "React Hooks",
    icon: Zap,
    subtopics: [
      ...coreHooks,
      ...advancedHooks,
      ...concurrentHooks,
      customHooksData,
    ],
  },
  {
    id: "concepts",
    title: "Other Concepts",
    icon: Layers,
    subtopics: [
      contextOptimizationData,
      debounceData,
      lazyLoadData,
      virtualizationData,
    ],
  },
];

export default STUDY_SECTIONS;
