'use client';


import React from 'react';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';

// Custom components
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators';
import HistoryItem from 'views/admin/marketplace/components/HistoryItem';
import NFT from 'components/card/NFT';
import Card from 'components/card/Card';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';

// Assets
import Nft1 from 'img/nfts/Nft1.png';
import Nft2 from 'img/nfts/Nft2.png';
import Nft3 from 'img/nfts/Nft3.png';
import Nft4 from 'img/nfts/Nft4.png';
import Nft5 from 'img/nfts/Nft5.png';
import Nft6 from 'img/nfts/Nft6.png';
import Avatar1 from 'img/avatars/avatar1.png';
import Avatar2 from 'img/avatars/avatar2.png';
import Avatar3 from 'img/avatars/avatar3.png';
import Avatar4 from 'img/avatars/avatar4.png';
import AdminLayout from 'layouts/admin';

export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
     
        
      
          <Card px="0px" mb="20px">
            <TableTopCreators tableData={tableDataTopCreators} />
          </Card>
       
      
      {/* Delete Product */}
    </Box>
  );
}
