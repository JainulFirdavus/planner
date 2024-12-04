'use client';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,SimpleGrid,ModalFooter
} from '@chakra-ui/react';

import { Todo } from '../../app/admin/worklist/types/todo';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  existingTodo?: Todo; // Optional prop for editing an existing Todo
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isOpen,
  onClose,
  addTodo,
  editTodo,
  existingTodo,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    projectName: '',
    category: '',
    dueDate: '',
    type:'',
    status: 'pending', // default status
  });
  const toast = useToast();

  useEffect(() => {
    if (existingTodo) {
      // Populate the form fields if editing an existing Todo
      setFormData({
        title: existingTodo.title,
        description: existingTodo.description,
        priority: existingTodo.priority,
        projectName: existingTodo.projectName,
        category: existingTodo.category,
        dueDate: existingTodo.dueDate,
        status: existingTodo.status,
        type: existingTodo.type,
      });
    }
  }, [existingTodo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Please provide a title.',
        description: 'A title is required to add or edit a todo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTodo: Todo = {
      id: existingTodo ? existingTodo.id : Date.now(), // Use existing id for editing
      title: formData.title,
      description: formData.description,
      priority: formData.priority as 'low' | 'medium' | 'high',
      projectName: formData.projectName,
      category: formData.category,
      dueDate: formData.dueDate,
      createdAt: existingTodo ? existingTodo.createdAt : new Date().toISOString(),
      status: formData.status as 'pending' | 'in-progress' | 'completed',
      type: formData.type as 'git' | 'development' | 'email' | 'errands' | 'activity',
      completed: existingTodo ? existingTodo.completed : false,
    };

    if (existingTodo) {
      editTodo(newTodo); // Update the existing Todo
    } else {
      addTodo(newTodo); // Add a new Todo
    }

    setFormData({
      title: '',
      description: '',
      priority: '',
      projectName: '',
      category: '',
      dueDate: '',
      type:'',
      status: 'pending',
    });
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalOverlay />
      <ModalContent maxWidth='800px'>
        <ModalHeader>{existingTodo ? 'Edit Todo' : 'Add New Todo'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl mt={4}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title of the task"
            />
          </FormControl>

          <FormControl isRequired gridColumn={{ base: "1 / span 2", md: "span 2" }}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
               name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="priority">Priority</FormLabel>
            <Select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              placeholder="Select priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="projectName">Project Name</FormLabel>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project name"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category for the task"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="dueDate">Due Date</FormLabel>
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="status">Type</FormLabel>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Select status"
            >
              <option value="pending">Git</option>
              <option value="development">Development</option>
              <option value="email¸">Email</option>
              <option value="activity¸">Activity</option>
              <option value="errands">Errands</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Select status"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl> 
          </SimpleGrid>

        </ModalBody>
        <ModalFooter >
        <Button
            colorScheme="teal"
            width="50%"
            mt={6}
            onClick={handleSubmit}
          >
            {existingTodo ? 'Update Todo' : 'Add Todo'}
          </Button>
          <Button    colorScheme="red"
            width="50%" ml={10}
            mt={6}   onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
};

export default AddTodoModal;
