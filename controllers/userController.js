import User from '../models/user.js';
import { body, validationResult } from 'express-validator';
import logger from '../config/logger.js';

export const registerUser = async (req, res) => {
    await body('firstName').notEmpty().withMessage('First name is required').run(req);
    await body('lastName').notEmpty().withMessage('Last name is required').run(req);
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('phone').notEmpty().withMessage('Phone number is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = 'Validation failed';
        logger.info(errorMsg);
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone } = req.body;

    try {
        const newUser = new User({ firstName, lastName, email, phone });
        await newUser.save();
        const successMsg = 'User registered successfully';
        logger.info(successMsg);
        res.status(201).json({ message: successMsg, user: newUser });
    } catch (err) {
        const errorMsg = 'Internal Server Error';
        logger.info(errorMsg);
        res.status(500).json({ message: errorMsg, error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const notFoundMsg = 'User not found';
            logger.info(notFoundMsg);
            return res.status(404).json({ message: notFoundMsg });
        }
        const successMsg = 'User retrieved successfully';
        logger.info(successMsg);
        res.status(200).json(user);
    } catch (err) {
        const errorMsg = 'Internal Server Error';
        logger.info(errorMsg);
        res.status(500).json({ message: errorMsg, error: err.message });
    }
};

export const updateUser = async (req, res) => {
    await body('firstName').optional().notEmpty().withMessage('First name cannot be empty').run(req);
    await body('lastName').optional().notEmpty().withMessage('Last name cannot be empty').run(req);
    await body('email').optional().isEmail().withMessage('Invalid email').run(req);
    await body('phone').optional().notEmpty().withMessage('Phone number cannot be empty').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = 'Validation failed';
        logger.info(errorMsg);
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const notFoundMsg = 'User not found';
            logger.info(notFoundMsg);
            return res.status(404).json({ message: notFoundMsg });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();
        const successMsg = 'User updated successfully';
        logger.info(successMsg);
        res.status(200).json({ message: successMsg, user });
    } catch (err) {
        const errorMsg = 'Internal Server Error';
        logger.info(errorMsg);
        res.status(500).json({ message: errorMsg, error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const notFoundMsg = 'User not found';
            logger.info(notFoundMsg);
            return res.status(404).json({ message: notFoundMsg });
        }

        user.isActive = false;
        await user.save();
        const successMsg = 'User disabled successfully';
        logger.info(successMsg);
        res.status(200).json({ message: successMsg });
    } catch (err) {
        const errorMsg = 'Internal Server Error';
        logger.info(errorMsg);
        res.status(500).json({ message: errorMsg, error: err.message });
    }
};

export const listUsers = async (req, res) => {
    const { firstName, lastName, email, phone } = req.query;

    try {
        const users = await User.find({
            ...(firstName && { firstName: new RegExp(firstName, 'i') }),
            ...(lastName && { lastName: new RegExp(lastName, 'i') }),
            ...(email && { email: new RegExp(email, 'i') }),
            ...(phone && { phone: new RegExp(phone, 'i') }),
            isActive: true
        });
        const successMsg = 'Users retrieved successfully';
        logger.info(successMsg);
        res.status(200).json(users);
    } catch (err) {
        const errorMsg = 'Internal Server Error';
        logger.info(errorMsg);
        res.status(500).json({ message: errorMsg, error: err.message });
    }
};
