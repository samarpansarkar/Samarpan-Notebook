import { lazy } from "react";
import { Box, Zap, Layers, Activity, Smartphone, Server } from "lucide-react";

// Import all demo components here or use lazy loading if possible
// NOTE: Dynamic imports with variables require specific paths in Vite/Webpack
// So we manually map them here.

const UseStateDemo = lazy(() =>
  import("../topics/react/components/UseStateDemo")
);
// Add other demos here as you create them

export const iconRegistry = {
  Box,
  Zap,
  Layers,
  Activity,
  Smartphone,
  Server,
};

export const componentRegistry = {
  UseStateDemo,
};

export const getIcon = (iconName) => {
  return iconRegistry[iconName] || Box;
};

export const getComponent = (componentName) => {
  return componentRegistry[componentName] || null;
};
