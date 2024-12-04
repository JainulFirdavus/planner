// components/MiniStatistics.tsx

import React from 'react';
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { MdCheckCircle, MdPendingActions, MdCalendarToday } from 'react-icons/md';

interface MiniStatisticsProps {
  total: number;
  completed: number;
  pending: number;
  upcoming: number;
}

const MiniStatistics: React.FC<MiniStatisticsProps> = ({ total, completed, pending, upcoming }) => {
  return (
    <Flex justify="space-between" wrap="wrap" gap={4}>
      <Box bg="teal.100" p={4} borderRadius="lg" w="200px" textAlign="center">
        <Icon as={MdCheckCircle} boxSize={8} color="green.500" />
        <Text mt={2} fontWeight="bold" fontSize="xl">
          {completed}
        </Text>
        <Text fontSize="sm">Completed</Text>
      </Box>
      <Box bg="yellow.100" p={4} borderRadius="lg" w="200px" textAlign="center">
        <Icon as={MdPendingActions} boxSize={8} color="yellow.500" />
        <Text mt={2} fontWeight="bold" fontSize="xl">
          {pending}
        </Text>
        <Text fontSize="sm">Pending</Text>
      </Box>
      <Box bg="blue.100" p={4} borderRadius="lg" w="200px" textAlign="center">
        <Icon as={MdCalendarToday} boxSize={8} color="blue.500" />
        <Text mt={2} fontWeight="bold" fontSize="xl">
          {upcoming}
        </Text>
        <Text fontSize="sm">Upcoming</Text>
      </Box>
    </Flex>
  );
};

export default MiniStatistics;
