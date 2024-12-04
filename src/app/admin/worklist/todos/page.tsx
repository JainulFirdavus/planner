'use client';
import { Container,
  Heading,
  Button,
  Stack,
  Flex,
  Box,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Image,
  useDisclosure,
  SimpleGrid,useColorModeValue,
  Text} from '@chakra-ui/react';
import { useState } from 'react';
import { EditIcon  ,CheckIcon} from '@chakra-ui/icons';
import AddTodoModal from '../../../../components/modal/AddTodoModal';
import { Todo } from '../types/todo';
import PaginationComponent from '../../../../components/Pagination/Pagination'; // Importing the pagination component

const ITEMS_PER_PAGE = 5;

const Home: React.FC = () => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    onOpen();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleComplete = (todoId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, status: 'Completed' } : todo
      )
    );
  };

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.status === 'Completed').length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
    <Grid
      mb="20px"
      gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
      gap={{ base: '20px', xl: '20px' }}
      display={{ base: 'block', xl: 'grid' }}
    >  <Flex
        flexDirection="column"
        gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }} >
      {/* MiniStatistics Component */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        <Box bg="brandScheme" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="lg">Total Todos</Text>
          <Text fontSize="xl" fontWeight="bold">{totalTodos}</Text>
        </Box>
        <Box bg="green.100" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="lg">Completed Todos</Text>
          <Text fontSize="xl" fontWeight="bold">{completedTodos}</Text>
        </Box>
        <Box bg="yellow.100" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="lg">Pending Todos</Text>
          <Text fontSize="xl" fontWeight="bold">{pendingTodos}</Text>
        </Box>
      </SimpleGrid>

      <Button colorScheme="teal" onClick={onOpen} mb={6}>
        Add New Todo
      </Button>

      {/* Todo List Table */}
      <Box width="100%" p={4} borderWidth={1} borderRadius="md">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Priority</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedTodos.map((todo) => (
              <Tr key={todo.id}>
                <Td>
                   icon
                </Td>
                <Td>{todo.title}</Td>
                <Td>{todo.description}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      todo.priority === 'warning'
                        ? 'yellow'
                        : todo.priority === 'danger'
                        ? 'red'
                        : 'blue'
                    }
                  >
                    {todo.priority}
                  </Badge>
                </Td>
                <Td>{todo.dueDate}</Td>
                <Td>
                  <Text
                    fontWeight="bold"
                    color={todo.status === 'Completed' ? 'green.500' : 'yellow.500'}
                  >
                    {todo.status}
                  </Text>
                </Td>
                <Td>
                  {todo.status !== 'Completed' && (
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      aria-label="Complete Todo"
                      onClick={() => handleComplete(todo.id)}
                    />
                  )}
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    aria-label="Edit Todo"
                    onClick={() => handleEdit(todo)}
                    ml={2}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalCount={todos.length}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {/* Add/Edit Todo Modal */}
      <AddTodoModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditingTodo(null);
        }}
        addTodo={addTodo}
        editTodo={editTodo}
        existingTodo={editingTodo}
      /> 
      </Flex>
      </Grid>
      </Box>
  );
};

export default Home;