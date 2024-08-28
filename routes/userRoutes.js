import express from 'express';
import {
    registerUser,
    getUserById,
    updateUser,
    deleteUser,
    listUsers
} from '../controllers/userController.js';
const router = express.Router();

router.post('/users', registerUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users', listUsers);

export default router;
