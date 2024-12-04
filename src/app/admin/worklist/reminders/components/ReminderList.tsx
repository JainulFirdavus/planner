// components/ReminderList.tsx

import React from 'react';
import { List, ListItem, Checkbox, Box, Button, Text } from '@chakra-ui/react';
import { Reminder } from '../types'; // Ensure the type is imported correctly

interface ReminderListProps {
  reminders: Reminder[];
  toggleCompleted: (id: number) => void;
  handleEditReminder: (reminder: Reminder) => void;
  handleDeleteReminder: (id: number) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders, toggleCompleted, handleEditReminder, handleDeleteReminder }) => {
  return (
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
  );
};

export default ReminderList;
