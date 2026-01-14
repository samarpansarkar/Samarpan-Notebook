import { lazy } from "react";
import * as LucideIcons from "lucide-react";

const UseStateDemo = lazy(() =>
  import("@/topics/react/components/UseStateDemo")
);

const UseEffectDemo = lazy(() =>
  import("@/topics/react/components/UseEffectDemo")
);

export const iconRegistry = LucideIcons;

export const componentRegistry = {
  UseStateDemo,
  UseEffectDemo,
};

export const getIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName];
  return IconComponent || LucideIcons.Box;
};

export const getComponent = (componentName) => {
  return componentRegistry[componentName] || null;
};
