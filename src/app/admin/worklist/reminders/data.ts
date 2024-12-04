// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';

// Example database CRUD functions
  const getReminders = async () => {
    const queryText = 'SELECT * FROM reminders ORDER BY reminder_time';
    const result = await query(queryText);
    return result.rows;
};

  const addReminder = async (reminder: any) => {
    const { text, reminder_time, priority, status, repeat, category, project, description } = reminder;
    const queryText = `
      INSERT INTO reminders (text, reminder_time, priority, status, repeat, category, project, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const params = [text, reminder_time, priority, status, repeat, category, project, description];
    const result = await query(queryText, params);
    return result.rows[0];
};

  const updateReminder = async (id: number, reminder: any) => {
    const { text, reminder_time, priority, status, repeat, category, project, description } = reminder;
    const queryText = `
      UPDATE reminders
      SET text = $1, reminder_time = $2, priority = $3, status = $4, repeat = $5, category = $6, project = $7, description = $8
      WHERE id = $9
      RETURNING *;
    `;
    const params = [text, reminder_time, priority, status, repeat, category, project, description, id];
    const result = await query(queryText, params);
    return result.rows[0];
};

  const deleteReminder = async (id: number) => {
    const queryText = 'DELETE FROM reminders WHERE id = $1 RETURNING *;';
    const result = await query(queryText, [id]);
    return result.rows[0];
};

  const toggleCompleted = async (id: number) => {
    const queryText = 'UPDATE reminders SET completed = NOT completed WHERE id = $1 RETURNING *;';
    const result = await query(queryText, [id]);
    return result.rows[0];
};




const getRemindersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reminders = await getReminders();
        res.status(200).json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching reminders' });
    }
};

const addReminderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { text, reminder_time, priority, status, repeat, category, project, description } = req.body;

        try {
            const reminder = await addReminder({
                text,
                reminder_time,
                priority,
                status,
                repeat,
                category,
                project,
                description,
            });
            res.status(200).json(reminder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error adding reminder' });
        }
    }
};

const updateReminderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { text, reminder_time, priority, status, repeat, category, project, description } = req.body;

        try {
            const reminder = await updateReminder(Number(id), {
                text,
                reminder_time,
                priority,
                status,
                repeat,
                category,
                project,
                description,
            });
            res.status(200).json(reminder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating reminder' });
        }
    }
};

const deleteReminderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const deletedReminder = await deleteReminder(Number(id));
        res.status(200).json(deletedReminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting reminder' });
    }
};

const toggleCompletedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const updatedReminder = await toggleCompleted(Number(id));
        res.status(200).json(updatedReminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error toggling reminder completion' });
    }
};

export   { getRemindersHandler, addReminderHandler, updateReminderHandler, toggleCompletedHandler, deleteReminderHandler };