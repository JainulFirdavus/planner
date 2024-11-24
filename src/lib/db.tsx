 
require ('dotenv').config();  
// @ts-ignore 
import { Pool } from 'pg'
 
console.log(process.env.POSTGRES_URL,'DB');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // user: process.env.POSTGRES_USER,
  // host: process.env.POSTGRES_HOST,
  // database: process.env.POSTGRES_DATABASE,
  // password: process.env.POSTGRES_PASSWORD,
  // port: 5432,
});
export const query = async (text: string, params: any[] = []) => {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const res = await client.query(text, params); // Execute the query
    return res; // Return the result
  } catch (err) {
    console.error('Database query error:', err);
    throw err; // Throw error to be handled in calling function
  } finally {
    client.release(); // Release the client back to the pool
  }
};


export default pool;