import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path'
dotenv.config();


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Only .jpeg and .png files are allowed.'));
        }
    }
}).single('avatar');

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

export const uploadAvatar = async (req, res) => {
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

        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const avatarPath = `/uploads/${req.file.filename}`;
            user.miniAvatar = avatarPath;
            await user.save();

            res.status(200).json({ message: 'آواتار با موفقیت به روز شد', avatar: avatarPath });
        });
    } catch (err) {
        res.status(403).json({ message: 'خطا در اعتبار سنجی توکن' });
    }
};

