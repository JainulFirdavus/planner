// pages/reminders.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Flex, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Select, Textarea } from '@chakra-ui/react';
import MiniStatistics from './components/MiniStatistics';
import SimpleGridComponent from './components/SimpleGrid';
import ReminderList from './components/ReminderList';
import { Reminder } from './types';

const RemindersPage = () => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
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
      setEditReminderId(null);
    } else {
      setReminders(prevReminders => [...prevReminders, newReminder]);
    }

    closeModal();
    resetForm();
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
    setEditReminderId(reminder.id);
    openModal();
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
    resetForm();
  };

  // Calculate statistics
  const total = reminders.length;
  const completed = reminders.filter(reminder => reminder.completed).length;
  const pending = total - completed;
  const upcoming = reminders.filter(reminder => new Date(reminder.reminderTime) > new Date() && !reminder.completed).length;

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >  <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
          </Flex> 
          {/* Mini Statistics and Simple Grid */}
          <MiniStatistics total={total} completed={completed} pending={pending} upcoming={upcoming} />
          <SimpleGridComponent total={total} completed={completed} pending={pending} />
          {/* Reminder List */}
          <ReminderList
            reminders={reminders}
            toggleCompleted={toggleCompleted}
            handleEditReminder={handleEditReminder}
            handleDeleteReminder={handleDeleteReminder}
          />
          <Flex
            mt="45px"
            mb="20px"
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
          > 
            <Button colorScheme="teal" onClick={openModal} mb={4}>
              Add Reminder
            </Button>
          </Flex>

          {/* Modal for adding/editing reminder */}
          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{editReminderId ? 'Edit Reminder' : 'Add Reminder'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
        </Flex>
      </Grid>
    </Box>

  );
};

export default RemindersPage;
