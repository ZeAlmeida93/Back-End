import express, { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { IProduct } from '../interfaces/interfaces.js';

const router: Router = Router();

import ProductController from '../controllers/productsController.js';


// // // Get all products
router.get ('/products' , ProductController.getAll);

// // // Create a new product
// router.post('/products', (req: Request, res: Response) => {


//     const newProduct: IProduct = {
//         id: products.length + 1,
//         title: req.body.title,
//         description: req.body.description,
//         category: req.body.category,
//         price: req.body.price,
//         brand: req.body.brand,
//         sku: req.body.sku,
//         image: req.body.image,

//     }


//     products.push(newProduct);
//     res.status(201).json(newProduct);
// });

// // // Update an existing product

// router.put('/products/:id', (req: Request, res: Response) => {

// });

// // // Delete an existing product


// router.delete('/products/:id', (req: Request, res: Response) => {

// });


// router.get('/products/search', (req, res) => {

// });


// // // // Get product by ID
// router.get('/products/:id', (req: Request, res: Response) => {

// });


export default router; // ao colocar default quer dizer que podemos mudar o nome