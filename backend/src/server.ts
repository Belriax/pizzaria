import express, {Request, Response, NextFunction} from "express";
import cors from 'cors';
import 'express-async-errors';
import path from 'path';

import { router } from "./routes";

// iniciar expressjs
const app = express();
// configurar tipo de arquivo JSON
app.use(express.json());
app.use(cors());

// configurar uso de rotas
app.use(router);

//  rota static 
app.use(
  '/files',
  express.static(path.resolve(__dirname, '../', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    // se for a instancia de um error
    res.status(400).json({error: err.message});
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})
// chamar a portar de escuta
app.listen(3333, () => console.log ("Servidor online!"))