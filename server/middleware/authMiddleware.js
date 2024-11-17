import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'token has expired' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'توکن نامعتبر یا منقضی شده است.' });
            }

            req.user = decoded;

            next();
        });
    } catch (error) {
        console.error('JWT Error:', err.message)
        return res.status(403).json({ message: 'دسترسی غیرمجاز: توکن نامعتبر یا منقضی شده است.' });
    }

};

export default authMiddleware;
