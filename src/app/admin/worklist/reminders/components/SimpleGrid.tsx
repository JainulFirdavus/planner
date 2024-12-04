// components/SimpleGrid.tsx

import React from 'react';
import { SimpleGrid, Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useBreakpointValue } from '@chakra-ui/react';

interface SimpleGridProps {
  total: number;
  completed: number;
  pending: number;
}

const SimpleGridComponent: React.FC<SimpleGridProps> = ({ total, completed, pending }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      <Box bg="teal.50" p={4} borderRadius="md">
        <Stat>
          <StatLabel>Total Reminders</StatLabel>
          <StatNumber>{total}</StatNumber>
        </Stat>
      </Box>

      <Box bg="green.50" p={4} borderRadius="md">
        <Stat>
          <StatLabel>Completed</StatLabel>
          <StatNumber>{completed}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {Math.round((completed / total) * 100)}%
          </StatHelpText>
        </Stat>
      </Box>

      <Box bg="yellow.50" p={4} borderRadius="md">
        <Stat>
          <StatLabel>Pending</StatLabel>
          <StatNumber>{pending}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            {Math.round((pending / total) * 100)}%
          </StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

export default SimpleGridComponent;
