import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const router: Router = Router();

// Get all products
router.get('/products', ProductController.getAll);

// Get product by ID
router.get('/products/:id', ProductController.getOne);

// Create a new product
router.post('/products', ProductController.create);

// Update an existing product
router.put('/products/:id', ProductController.update);

// Delete an existing product
router.delete('/products/:id', ProductController.delete);

export default router;