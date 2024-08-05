import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { check } from 'express-validator';

const router: Router = Router();

// Get all users
router.get('/users', UserController.getAll);

// Get user by ID
router.get('/users/:id', UserController.getOne);

// Register a new user
router.post('/users/register', [

    check('name').notEmpty().withMessage("Name is required"),
    check('email').isEmail().withMessage("Invalid Email Format"),
    check('password').isStrongPassword(),
    check('role').isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid Role")

], UserController.register);

//Login User
router.post('/users/login', [

    check('email').isEmail().withMessage("Invalid Email Format"),
    check('password').notEmpty().withMessage("Password is required")


], UserController.login)


// Update an existing user
router.put('/users/:id', UserController.update);

// Delete an existing user
router.delete('/users/:id', UserController.delete);

export default router;