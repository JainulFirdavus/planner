/* eslint-disable */

// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue, Collapse, useDisclosure, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
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
          <Link key={index} href={route.layout + route.path }>
            {route.icon ? (
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
                    {route.nestedItems && (<IconButton icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} size="sm" variant="ghost" aria-label="Toggle Navigation" onClick={onToggle} />)}

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

                {route.nestedItems && (<Collapse in={isOpen} animateOpacity>
                  <Box pl={4}>
                    {route.nestedItems.map((item, indexj) => (
                      <Link key={indexj} href={route.layout + item.path}> 
                        <Box>
                          <HStack
                            spacing={
                              activeRoute(item.name.toLowerCase()) ? '22px' : '26px'
                            }
                            py="5px"
                            ps="10px"
                          >
                            <Text
                              me="auto"
                              color={
                                activeRoute(item.name.toLowerCase())
                                  ? activeColor
                                  : inactiveColor
                              }
                              fontWeight={
                                activeRoute(item.name.toLowerCase()) ? 'bold' : 'normal'
                              }
                            >
                              {item.name}
                            </Text>
                            <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                          </HStack>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                </Collapse>
                )}
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </Link>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
