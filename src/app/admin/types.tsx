// pages/reminders.tsx

'use client'; // Mark this file as a Client Component

import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, Checkbox, Text, Stack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Select, Textarea } from '@chakra-ui/react';

type Reminder = {
  id: number;
  text: string;
  completed: boolean;
  reminderTime: string;
  priority: string;
  status: string;
  repeat: string;
  category: string;
  project: string;
  description: string;
};

const RemindersPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editReminderId, setEditReminderId] = useState<number | null>(null);

  const [reminderText, setReminderText] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [repeat, setRepeat] = useState('None');
  const [category, setCategory] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  
  const toast = useToast();

  const handleAddReminder = () => {
    if (reminderText.trim() === '' || !reminderTime) return;

    const newReminder: Reminder = {
      id: Date.now(),
      text: reminderText,
      completed: false,
      reminderTime: reminderTime,
      priority: priority,
      status: status,
      repeat: repeat,
      category: category,
      project: project,
      description: description,
    };

    if (editReminderId) {
      // Editing existing reminder
      setReminders(prevReminders =>
        prevReminders.map(reminder =>
          reminder.id === editReminderId ? { ...newReminder, id: editReminderId } : reminder
        )
      );
      setEditReminderId(null); // Reset edit mode
    } else {
      // Adding a new reminder
      setReminders(prevReminders => [...prevReminders, newReminder]);
    }

    closeModal(); // Close modal after saving
    resetForm();  // Reset form fields
  };

  const handleEditReminder = (reminder: Reminder) => {
    setReminderText(reminder.text);
    setReminderTime(reminder.reminderTime);
    setPriority(reminder.priority);
    setStatus(reminder.status);
    setRepeat(reminder.repeat);
    setCategory(reminder.category);
    setProject(reminder.project);
    setDescription(reminder.description);
    setEditReminderId(reminder.id); // Set the ID to mark the reminder as "being edited"
    openModal(); // Open modal in edit mode
  };

  const toggleCompleted = (id: number) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(prevReminders => prevReminders.filter(reminder => reminder.id !== id));
  };

  const resetForm = () => {
    setReminderText('');
    setReminderTime('');
    setPriority('Medium');
    setStatus('Pending');
    setRepeat('None');
    setCategory('');
    setProject('');
    setDescription('');
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetForm(); // Reset form when closing modal
  };

  // Notification feature for time-based reminders
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toISOString();

      reminders.forEach((reminder) => {
        if (!reminder.completed && new Date(reminder.reminderTime) <= new Date(currentTime)) {
          toast({
            title: 'Reminder!',
            description: `It's time for: ${reminder.text}`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });

          // Mark reminder as completed after notifying
          setReminders((prevReminders) =>
            prevReminders.map((reminder) =>
              reminder.id === reminder.id ? { ...reminder, completed: true } : reminder
            )
          );
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders, toast]);

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Reminders
      </Text>

      <Button colorScheme="teal" onClick={openModal} mb={4}>
        Add Reminder
      </Button>

      <List spacing={3}>
        {reminders.map((reminder) => (
          <ListItem key={reminder.id} display="flex" alignItems="center" borderBottom="1px solid gray" pb={3}>
            <Checkbox
              isChecked={reminder.completed}
              onChange={() => toggleCompleted(reminder.id)}
              colorScheme="teal"
            />
            <Box ml={3} flex="1">
              <Text fontWeight="bold" textDecoration={reminder.completed ? 'line-through' : 'none'}>
                {reminder.text}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(reminder.reminderTime).toLocaleString()} | {reminder.priority} | {reminder.status} | {reminder.repeat}
              </Text>
              <Text fontSize="sm" color="gray.600">{reminder.category} - {reminder.project}</Text>
              <Text fontSize="sm" color="gray.600">{reminder.description}</Text>
            </Box>
            <Button size="sm" colorScheme="blue" onClick={() => handleEditReminder(reminder)}>Edit</Button>
            <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDeleteReminder(reminder.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Modal for adding/editing reminder */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editReminderId ? 'Edit Reminder' : 'Add Reminder'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Enter reminder text..."
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
              />
              <Input
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Select>
              <Select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </Select>
              <Input
                placeholder="Category (e.g., Work, Personal)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Input
                placeholder="Project (e.g., Project A)"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddReminder}>
              {editReminderId ? 'Save Changes' : 'Add Reminder'}
            </Button>
            <Button variant="ghost" onClick={closeModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

