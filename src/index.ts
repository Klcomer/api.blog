import dotenv from 'dotenv';

dotenv.config({ path: "./.config.env" });

const Main = async () => {
    process.on("uncaughtException", err => {
        console.error('UNCAUGHT EXCEPTION! 💥', err.stack);
        process.exit(1);
    });


    const { app } = require('./app');
    const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    });

    process.on('unhandledRejection', (err: any) => {
        console.error('UNHANDLED REJECTION! 💥', err.stack);
        server.close(() => process.exit(1));
    });
};

Main();
