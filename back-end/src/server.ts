import express from 'express'
import cors from 'cors'
import InitRoutes from './routes/routes.ts';

const port = 8080;
const app = express();
app.use(cors());
InitRoutes(app);

app.listen(port, () => console.log("Api rodando na porta 8080"))