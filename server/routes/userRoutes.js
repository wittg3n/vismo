import express from 'express';
import { getUser, uploadAvatar } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/get', authMiddleware, getUser);

router.post('/upload-avatar', authMiddleware, uploadAvatar);

export default router;