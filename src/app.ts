import express, { Application } from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

import { authRoutes } from './routes/authRoutes';

const app: Application = express();

app.enable("trust proxy");

// Logging
// app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// Parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());
// app.use(cors({
//     origin: process.env.CLIENT_URL?.split(',') || '*',
//     credentials: true
// }));
// app.use(helmet({ crossOriginResourcePolicy: false }));


// API Routes
app.use('/api/v1/auth', authRoutes);

// 404 Handler
app.all("*", (req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

export { app };
