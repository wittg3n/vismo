import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const getUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'توکنی دریافت نشد' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'کاربر پیدا نشد' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(403).json({ message: 'خطا در اعتبار سنجی توکن' });
    }
};