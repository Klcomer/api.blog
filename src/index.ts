import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config';
import indexRoutes from './routes/index';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/', indexRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server çalışıyor: ${PORT}`));
