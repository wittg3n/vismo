import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { generateRefreshToken, generateAccessToken } from '../helpers/token.js';
dotenv.config();

export const signUp = async (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده است.' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'این نام کاربری قبلاً استفاده شده است.' });
        }

        const newUser = new User({ username, email, password, firstname, lastname });

        await newUser.save();

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: 'حساب کاربری با موفقیت ساخته شد',
        });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ثبت نام رخ داده است.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'کاربری با این ایمیل پیدا نشد.' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'رمز عبور اشتباه است.' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: 'ورود با موفقیت انجام شد',
        });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ورود رخ داده است. لطفاً دوباره تلاش کنید.' });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'حساب با موفقیت حذف شد.' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در حذف حساب کاربری.' });
    }
};

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'توکن بازنشانی دریافت نشد. لطفاً وارد شوید.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'کاربر پیدا نشد.' });
        }

        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: 'توکن جدید صادر شد.' });
    } catch (err) {
        res.status(403).json({ message: 'توکن بازنشانی نامعتبر یا منقضی شده است.' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('accessToken', { path: '/', httpOnly: true, });//TODO dont forget secure: true, sameSite: 'strict' 
    res.clearCookie('refreshToken', { path: '/', httpOnly: true, });
    res.status(200).json({ message: 'Logged out successfully' });
};
export const validateCookie = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: 'ok'
            });
        }
        res.status(200).json({
            message: 'Token is valid'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error validating cookie: ' + error.message
        });
    }
};