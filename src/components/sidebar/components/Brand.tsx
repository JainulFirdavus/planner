// Chakra imports
import { Flex, useColorModeValue ,Text} from '@chakra-ui/react';

// Custom components
import { PlannerLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			{/* <PlannerLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			{/* <Text
        fontSize="3xl"
        fontWeight="bold"
        bgGradient="linear(to-l, #7928CA, #FF0080)" // Gradient colors
        bgClip="text" // Apply gradient to text
      >
        Admin Dashboard
      </Text> */}
	   <Text fontSize="3xl" fontWeight="bold">
        <Text as="span" color="navy.500" pr='8px'>
          Smart 
        </Text>
        <Text as="span" color="blue.500">
		Intend
        </Text>
      </Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
