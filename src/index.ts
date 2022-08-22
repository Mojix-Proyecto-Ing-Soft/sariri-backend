import express, { Express } from 'express';
import cors from 'cors';

import router from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
}));

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});