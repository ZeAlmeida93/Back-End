import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import { check } from 'express-validator';


const router: Router = Router();


const validateProduct = [

check ("name").notEmpty().withMessage("Product Name is Required"),
check ("description").notEmpty().withMessage("Product Description is Required"),
check ("Price").isNumeric().notEmpty().withMessage("Product Price is Required"),
check ("ean").optional().isLength({min:13, max:13}).withMessage("EAN must 13 digits long")

];

// Get all products
router.get('/products', ProductController.getAll);

// Get product by ID
router.get('/products/:id', ProductController.getOne);

// Create a new product
router.post('/products', validateProduct , ProductController.create);

// Update an existing product
router.put('/products/:id', ProductController.update);

// Delete an existing product
router.delete('/products/:id', ProductController.delete);

export default router;