import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db.js';
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from "cors"
dotenv.config();
const app = express()
import cookieparser from 'cookie-parser'

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,               // Allow sending cookies
};

app.use(cors(corsOptions));
app.disable('x-powered-by') //sum security fucks
app.use(express.json()); //json parser
app.use(passport.initialize()); //passport
app.use(cookieparser()); //cookie parser
connectDB();


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
