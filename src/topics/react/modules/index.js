import { coreHooks } from "@/topics/react/modules/core";
import { advancedHooks } from "@/topics/react/modules/advanced";
import { concurrentHooks } from "@/topics/react/modules/concurrent";
import { patterns } from "@/topics/react/modules/patterns";

const STUDY_SECTIONS = [
  ...coreHooks,
  ...advancedHooks,
  ...concurrentHooks,
  ...patterns,
];

export default STUDY_SECTIONS;
