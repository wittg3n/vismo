import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده است.' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'این نام کاربری قبلاً استفاده شده است.' });
        }

        const newUser = new User({ username, email, password });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: 'حساب کاربری با موفقیت ساخته شد',
            token
        });
    } catch (error) {
        console.error(error);
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
        //TODO make two seporate jwt check helpers
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'ورود با موفقیت انجام شد',
            token
        });
    } catch (error) {
        console.log(asdas);
        res.status(500).json({ message: 'خطا در ورود رخ داده است. لطفاً دوباره تلاش کنید.' });
    }
};


export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account' });
    }
};
