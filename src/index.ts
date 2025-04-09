import dotenv from 'dotenv';
import path from 'path';
import { app } from './app';
import connectDB from './config';

// dotenv.config({ path: "../.env" });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// dotenv.config();

const PORT = process.env.PORT || 8000;

const Main = async () => {
    try {
        // Veritabanı bağlantısı
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });

        process.on('unhandledRejection', (err: any) => {
            console.error('UNHANDLED REJECTION! 💥', err);
            server.close(() => process.exit(1));
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

process.on("uncaughtException", err => {
    console.error('UNCAUGHT EXCEPTION! 💥', err);
    process.exit(1);
});

Main();
