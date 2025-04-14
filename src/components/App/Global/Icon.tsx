import React from "react";
import * as LucideIcons from "lucide-react";

// Extract all icon names as valid keys
type IconKeys = keyof typeof LucideIcons;

// Define the Icon object with strong typing for all icons
const Icon: Record<
  IconKeys,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {} as any;

// Dynamically assign each Lucide icon to the Icon object
Object.entries(LucideIcons).forEach(([key, Component]) => {
  Icon[key as IconKeys] = ((props) =>
    React.createElement(
      Component as React.FC<React.SVGProps<SVGSVGElement>>,
      props
    )) as React.FC<React.SVGProps<SVGSVGElement>>;
});

export default Icon;
