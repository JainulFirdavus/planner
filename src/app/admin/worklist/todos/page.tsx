"use client"

import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Input, SimpleGrid, Text, VStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  TODO_ITEM: 'TODO_ITEM'
};

const KanbanBoard = () => {
  const toast = useToast();
  const [todos, setTodos] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a new task to the "To Do" list
  const addTodo = () => {
    if (!newTask) {
      toast({
        title: "Task name cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true
      });
      return;
    }

    setTodos({
      ...todos,
      todo: [...todos.todo, { id: Date.now(), text: newTask, status: 'todo' }]
    });
    setNewTask('');
    setIsModalOpen(false);
  };

  // Move task between different columns
  const moveTask = (itemId, fromColumn, toColumn) => {
    const item = todos[fromColumn].find(task => task.id === itemId);
    const newFromColumn = todos[fromColumn].filter(task => task.id !== itemId);
    const newToColumn = [...todos[toColumn], { ...item, status: toColumn }];

    setTodos({
      ...todos,
      [fromColumn]: newFromColumn,
      [toColumn]: newToColumn
    });
  };

  // Edit task text
  const editTask = (itemId, newText, column) => {
    const updatedTasks = todos[column].map(task =>
      task.id === itemId ? { ...task, text: newText } : task
    );
    setTodos({ ...todos, [column]: updatedTasks });
  };

  // Delete a task
  const deleteTask = (itemId, column) => {
    const updatedTasks = todos[column].filter(task => task.id !== itemId);
    setTodos({ ...todos, [column]: updatedTasks });
  };

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>

      <DndProvider backend={HTML5Backend}>
        <Box p={6}>
          <VStack spacing={4} align="stretch" mb={6}>
            {/* "To-Do" Button to open modal */}
            <Button colorScheme="teal" onClick={() => setIsModalOpen(true)} w="200px" mb={6}>
              Add New Task
            </Button>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <KanbanColumn
              title="To Do"
              tasks={todos.todo}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="todo"
              moveOptions
            />
            <KanbanColumn
              title="In Progress"
              tasks={todos.inProgress}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="inProgress"
              moveOptions
            />
            <KanbanColumn
              title="Completed"
              tasks={todos.completed}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="completed"
              moveOptions
            />
          </SimpleGrid>

          {/* Modal to Add Task */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Task Description"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="teal" ml={3} onClick={addTodo}>
                  Add Task
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </DndProvider>
    </Box>
  );
};

const KanbanColumn = ({ title, tasks, moveTask, editTask, deleteTask, column, moveOptions }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    drop: (item) => moveTask(item.id, item.fromColumn, column),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <Box
      ref={drop}
      p={4}
      borderWidth={2}
      borderRadius="lg"
      bg="gray.50"
      minHeight="400px"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transition: 'box-shadow 0.3s ease' }}
      borderColor="gray.300"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.600">{title}</Text>
      {tasks.length === 0 ? (
        <Text color="gray.500">No tasks available</Text>
      ) : (
        tasks.map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
            column={column}
            moveOptions={moveOptions}
          />
        ))
      )}
    </Box>
  );
};

const KanbanTask = ({ task, moveTask, editTask, deleteTask, column, moveOptions }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TODO_ITEM,
    item: { id: task.id, fromColumn: column }
  });

  return (
    <Box
      ref={drag}
      mb={3}
      p={3}
      borderWidth={1}
      borderRadius="md"
      bg="teal.100"
      color="black"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="sm"
      _hover={{ bg: 'teal.200', cursor: 'move' }}
    >
      <Text>{task.text}</Text>
      <Box>
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => editTask(task.id, prompt('Edit Task:', task.text), column)}
          variant="outline"
        >
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          ml={2}
          onClick={() => deleteTask(task.id, column)}
          variant="outline"
        >
          Delete
        </Button>
        {moveOptions && column !== "completed" && (
          <Button
            size="sm"
            colorScheme="blue"
            ml={2}
            onClick={() => moveTask(task.id, column, column === "todo" ? "inProgress" : "completed")}
            variant="outline"
          >
            Move {column === "todo" ? "To In Progress" : "To Completed"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default KanbanBoard;

/*
import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Input, SimpleGrid, Text, VStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  TODO_ITEM: 'TODO_ITEM'
};

const KanbanBoard = () => {
  const toast = useToast();
  const [todos, setTodos] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a new task to the "To Do" list
  const addTodo = () => {
    if (!newTask) {
      toast({
        title: "Task name cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true
      });
      return;
    }

    setTodos({
      ...todos,
      todo: [...todos.todo, { id: Date.now(), text: newTask, status: 'todo' }]
    });
    setNewTask('');
    setIsModalOpen(false);
  };

  // Move task between different columns
  const moveTask = (itemId, fromColumn, toColumn) => {
    const item = todos[fromColumn].find(task => task.id === itemId);
    const newFromColumn = todos[fromColumn].filter(task => task.id !== itemId);
    const newToColumn = [...todos[toColumn], { ...item, status: toColumn }];

    setTodos({
      ...todos,
      [fromColumn]: newFromColumn,
      [toColumn]: newToColumn
    });
  };

  // Edit task text
  const editTask = (itemId, newText, column) => {
    const updatedTasks = todos[column].map(task =>
      task.id === itemId ? { ...task, text: newText } : task
    );
    setTodos({ ...todos, [column]: updatedTasks });
  };

  // Delete a task
  const deleteTask = (itemId, column) => {
    const updatedTasks = todos[column].filter(task => task.id !== itemId);
    setTodos({ ...todos, [column]: updatedTasks });
  };

  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <Box p={6}>
          <VStack spacing={4} align="stretch" mb={6}>
            <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
              Add Task
            </Button>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <KanbanColumn
              title="To Do"
              tasks={todos.todo}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="todo"
            />
            <KanbanColumn
              title="In Progress"
              tasks={todos.inProgress}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="inProgress"
            />
            <KanbanColumn
              title="Completed"
              tasks={todos.completed}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              column="completed"
            />
          </SimpleGrid>
 
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Task Description"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="teal" ml={3} onClick={addTodo}>
                  Add Task
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </DndProvider>
    </ChakraProvider>
  );
};

const KanbanColumn = ({ title, tasks, moveTask, editTask, deleteTask, column }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TODO_ITEM,
    drop: (item) => moveTask(item.id, item.fromColumn, column),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <Box
      ref={drop}
      p={4}
      borderWidth={2}
      borderRadius="lg"
      bg="gray.50"
      minHeight="400px"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transition: 'box-shadow 0.3s ease' }}
      borderColor="gray.300"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.600">{title}</Text>
      {tasks.length === 0 ? (
        <Text color="gray.500">No tasks available</Text>
      ) : (
        tasks.map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
            moveTask={moveTask}
            editTask={editTask}
            deleteTask={deleteTask}
            column={column}
          />
        ))
      )}
    </Box>
  );
};

const KanbanTask = ({ task, moveTask, editTask, deleteTask, column }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TODO_ITEM,
    item: { id: task.id, fromColumn: column }
  });

  return (
    <Box
      ref={drag}
      mb={3}
      p={3}
      borderWidth={1}
      borderRadius="md"
      bg="teal.100"
      color="black"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="sm"
      _hover={{ bg: 'teal.200', cursor: 'move' }}
    >
      <Text>{task.text}</Text>
      <Box>
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => editTask(task.id, prompt('Edit Task:', task.text), column)}
          variant="outline"
        >
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          ml={2}
          onClick={() => deleteTask(task.id, column)}
          variant="outline"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default KanbanBoard;*/
