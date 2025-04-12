import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

interface ErrorResponse {
    success: boolean;
    message: string;
    stack?: string;
}

const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorResponse: ErrorResponse = {
        success: false,
        message: err.message
    };

    // Development ortamında stack trace'i de gönder
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // AppError instance'ı ise
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(errorResponse);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error: ' + err.message
        });
    }

    // Mongoose duplicate key error
    if (err.name === 'MongoServerError' && (err as any).code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered'
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please log in again!'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Your token has expired! Please log in again.'
        });
    }

    // Default error
    console.error('ERROR 💥', err);
    return res.status(500).json(errorResponse);
};

export default errorHandler; 