import  "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from "./erros/AppError";

const app = express();

// Configuração do middleware CORS
const corsOptions = {
    origin: 'https://netflexsite.vercel.app/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
app.use(cors(corsOptions));
  

app.use(express.json());

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

app.listen(3333, () => console.log("Server is running in port 3333"));