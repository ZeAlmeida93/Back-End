import { Request, Response } from 'express';
import { IProduct } from '../interfaces/interfaces.js';
import productService from '../services/productService.js';
import { validationResult } from 'express-validator';
import productModel from '../models/productModel.js'

class ProductController {
  getAll = async (req: Request, res: Response) => {
    try {
      const products: IProduct[] | undefined = await productService.getAll();

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get products' });
    }
  }
  
getOne = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;

      const product = await productService.getProductById(productId);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get product' });
    }
  }
  create = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      const image = req.files?.image;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const productToCreate: IProduct = req.body;
      const createdProduct: any = await productService.create(productToCreate);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;
      const productToUpdate: IProduct = req.body;
      const updatedProduct: IProduct | undefined = productService.update(productId, productToUpdate);

      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const productId: string = req.params.id;
      const deletedProduct = await productService.delete(productId);

      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
      }
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}

export default new ProductController();