 
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
export const query = (text: string, params?: any[]) => pool.query(text, params);
 
