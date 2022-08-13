import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Sariri Backend');
});

app.post('/', (req: Request, res: Response) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});