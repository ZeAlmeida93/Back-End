import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { check } from 'express-validator';
import { checkRole } from '../middlewares/authmiddleware.js';

const router: Router = Router();

// Get all users
router.get('/users', checkRole(["USER"]) /* use of middleware for validating USER */, UserController.getAll);

// Get user by ID
router.get('/users/:id', UserController.getOne);

// Register a new user
router.post('/users/register', [

    check('name').notEmpty().withMessage("Name is required"),
    check('email').isEmail().withMessage("Invalid Email Format"),
    check('password').isStrongPassword(),
    check('role').isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid Role"),
    check('avatarFile').custom((value, { req }) => {

        if (req.files || req.files.avatarFile) {

            throw new Error('Avatar is required')
        }
        const avatar = req.files.avatarFile;

        const allowedMimes = ['images/jpeg', 'images/png'];

        if (!avatar.mimetype) {
            console.log(avatar);
            throw new Error("PSPSPSPS");

        }

        if (!allowedMimes.includes(avatar.mimetype)) {

            throw new Error("Invalid image format.Only Jpeg or Png are allowed");
        }

        if (avatar.size > 5 * 1024 * 1024) {

            throw new Error('Image Size Exceeds 5 MB');

        }

        return true;

    })
], UserController.register);

//Login User
router.post('/users/login', [

    check('email').isEmail().withMessage("Invalid Email Format"),
    check('password').notEmpty().withMessage("Password is required")


], UserController.login)


// Update an existing user
router.put('/users/:id', checkRole(["USER, ADMIN"]), UserController.update);

// Delete an existing user
router.delete('/users/:id', checkRole(["ADMIN"]), UserController.delete);

export default router;