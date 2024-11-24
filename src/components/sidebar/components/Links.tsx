/* eslint-disable */
import {useState} from 'react'
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,Collapse, useDisclosure, IconButton,
 Button,  Heading, List, ListItem
} from '@chakra-ui/react';
import Link from 'next/link'; 
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Function to handle submenu toggle
  const toggleSubMenu = (path: string) => {
    setExpanded(expanded === path ? null : path); // Toggle open/close
  };

  const { routes } = props;

  //   Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue('gray.700', 'white');
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600',
  );
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );



  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    const { isOpen, onToggle } = useDisclosure()
    return routes.map((route, index: number) => {
      if (
        route.layout === '/admin' ||
        route.layout === '/auth'
        
      ) {  
        return (  
         
            <Box key={index}>
              {/* Main route link */}
              <Link href={route.layout + route.path}>
              <Box>
              <HStack
                spacing={
                  activeRoute(route.path?.toLowerCase()) ? '22px' : '26px'
                }
                py="5px"
                ps="10px"
                onClick={() => route.hasSubMenu && toggleSubMenu(route.path)} // Toggle submenu on click
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path?.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path?.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path?.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={
                    activeRoute(route.path?.toLowerCase())
                      ? brandColor
                      : 'transparent'
                  }
                  borderRadius="5px"
                />
              </HStack>
            </Box>
          </Link>

          {/* If the route has subMenu, render it here */}
            {route.hasSubMenu && route.nestedItems && (
            
            
            <Collapse in={ activeRoute(route.path)}> 
              <Box pl="20px" py="3px">
                {route.nestedItems.map((subRoute, subIndex) => (
                  <Link key={subIndex} href={route.layout+route.path + subRoute.path}>
                     <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute((route.layout+route.path + subRoute.path)?.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    {subRoute.icon}
                  </Box>
                  <Text  py="5px"
                    me="auto"
                    color={
                      activeRoute((route.layout+route.path + subRoute.path)?.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute((route.layout+route.path + subRoute.path)?.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {subRoute.name}
                  </Text>
                  <Box
                  h="36px"
                  w="4px"
                  bg={
                    activeRoute((route.layout+route.path + subRoute.path)?.toLowerCase()) 
                      ? brandColor
                      : 'transparent'
                  }
                  borderRadius="5px"
                />
                </Flex>
                  </Link>
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
       /*     <Link key={index} href={route.layout + route.path }> 
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path?.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path?.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path?.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path?.toLowerCase())
                          ? 'bold'
                          : 'normal'
                      }
                    >
                      {route.name}

                    </Text>
                  
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path?.toLowerCase())
                        ? brandColor
                        : 'transparent'
                    }
                    borderRadius="5px"
                  /> 
                </HStack>  
              </Box> 
          </Link>   */
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
