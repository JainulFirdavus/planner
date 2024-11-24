import { ReactComponentElement } from "react";

export interface IRoute {
  name: string;
  layout: string; 
  icon: ReactComponentElement | string;
  secondary?: boolean;
  path?: string;
  nestedItems?: MenuItem[];
  hasSubMenu?: boolean;
}
export interface MenuItem {
  name: string;
  path: string;
  icon?: ReactNode;  // Optional icon for nested menu items
}
