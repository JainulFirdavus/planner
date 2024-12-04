import React from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  useBreakpointValue,
  Text,
  Stack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const pagesToShow = useBreakpointValue({ base: 3, md: 5 });

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          variant={i === currentPage ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Button>
      );
    }
    return pages.slice(0, pagesToShow); // Show up to `pagesToShow` pages depending on breakpoint
  };

  return (
    <Flex justify="center" align="center" my={4}>
      <Stack direction="row" spacing={4} align="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          isDisabled={isPreviousDisabled}
          aria-label="Previous Page"
          colorScheme="teal"
        />
        {renderPageNumbers()}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          isDisabled={isNextDisabled}
          aria-label="Next Page"
          colorScheme="teal"
        />
      </Stack>
      <Text ml={4}>
        {`Page ${currentPage} of ${totalPages}`}
      </Text>
    </Flex>
  );
};

export default Pagination;
