import express from 'express';
import passport from 'passport';
import { signUp, login, deleteAccount, refreshAccessToken } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.delete('/delete', authMiddleware, deleteAccount);
router.post('/refresh-token', refreshAccessToken)

export default router;
