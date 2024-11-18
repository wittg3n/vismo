import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db.js';
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from "cors";
import path from 'path';
import cookieparser from 'cookie-parser';
dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,               // Allow sending cookies
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors(corsOptions));
app.disable('x-powered-by'); // For security
app.use(express.json()); // JSON parser
app.use(passport.initialize()); // Passport initialization
app.use(cookieparser()); // Cookie parser
app.use('/icons', express.static(path.join(__dirname, '../public/icons')));

connectDB();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
