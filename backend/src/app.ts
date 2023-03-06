import cors from 'cors';
import express from 'express';
import { Pool } from 'pg';
import router from './routes';

const pool = new Pool({
  user: 'biopark',
  host: 'localhost',
  database: 'biopark_db',
  password: 'biopark',
  port: 5432,
});

const app = express();

app.use(cors());
app.use(express.json());

// Adicione o pool de conexão do PostgreSQL ao objeto request
app.use((req, res, next) => {
  req.body = pool;
  next();
});

app.use(router);

export default app;
