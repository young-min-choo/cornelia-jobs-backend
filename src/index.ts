import express from 'express';
import jobsRouter from './routes/jobs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
const dbPromise = open({
  filename: './mydatabase.db', // Specify the database file
  driver: sqlite3.Database,
});

const app = express();

app.use(cors())

app.use('/api/jobs', jobsRouter)

const PORT = 3000;


const setup = async () => {
    const db = await dbPromise
    await db.migrate()
    app.listen(PORT, () => {
        console.log(`running on localhost:${PORT}`);
    })
}
setup()

export {dbPromise}