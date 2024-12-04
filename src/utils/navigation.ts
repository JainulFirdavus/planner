import { IRoute } from "types/navigation";

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
  const foundRoute: IRoute = routes.find(
    (route) =>
      isWindowAvailable() &&
      window.location.href.indexOf(route.layout + route.path) !== -1 &&
      route
  );

  return foundRoute;
};

  function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getcurrentActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes); 
  let name = route?.secondary ? capitalizeFirstLetter(window.location.href.split('/').pop())  : route?.name
  return name || "Pages";
};  


export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes);
  return route?.name || "Pages";
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes);
  return route?.secondary;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
  return getActiveRoute(routes) || false;
};
