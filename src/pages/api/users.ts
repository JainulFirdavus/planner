// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
console.log('-----');

  switch (method) {
    case 'GET':
      try {
        const result = await query('SELECT * FROM users');
        res.status(200).json(result.rows);
      } catch (error) { 
        console.log(error);
        
        res.status(500).json({ error: 'Failed to fetch data' });
      }
      break;

    case 'POST':
      try {
        const { name } = body;
        const result = await query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create entry' });
      }
      break;

    case 'PUT':
      try {
        const { id, name } = body;
        const result = await query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        res.status(200).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update entry' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = body;
        await query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete entry' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

export default handler;
