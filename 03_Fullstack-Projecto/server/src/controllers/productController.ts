import { Request, Response } from 'express';
import { IProduct } from '../interfaces/interfaces.js';
import productService from '../services/productService.js';
import { validationResult } from 'express-validator';

class ProductController {

  getAll = async (req: Request, res: Response) => {
    try {

      const products: IProduct[] | undefined = await productService.getAll();

      res.json(products);

    } catch (error) {

      res.status(500).json ({ error: 'Failed to get products'});
      

    }


  }
  getOne = async (req: Request, res: Response) => { 

 try {

  const productID: string = (req.params.id);

  const product: IProduct | undefined = productService.getProductbyId(productID);


  if (!product) {
res.status(404).json({error: 'Product not found'});

  }

  res.json(product);

    } catch (error) {
      console.log(error);

    }

  }
  create = async (req: Request, res: Response) => { 

 try {
const errors = validationResult(req);

if (!errors.isEmpty())  {

  res.status(400).json({erros: errors.array()})
}
  const product: IProduct = req.body;
  const createdProduct: any = productService.create(product);
  res.status(201).json(createdProduct);

    } catch (error) {
      res.status(500).json ({ error: 'Failed to create product'});
   } 

  }
  update = async (req: Request, res: Response) => { 

    const productID :string  = req.params.id;
    const productToUpdate: IProduct = req.body;
    const updatedProduct: IProduct | undefined = productService.update(productID, productToUpdate);

    if (!updatedProduct)  {

      res.status(404).json({ error: 'Product not found'});
}

res.status(201).json(updatedProduct);
 try {

    } catch (error) {
      res.status(500).json ({ error: 'Failed to update products'});

    }

  }
  delete = async (req: Request, res: Response) => { 

 try {

  const productID :string  = req.params.id;
  const deletedProduct: IProduct | undefined = productService.delete(productID);

  if (!deletedProduct) {
res.status(404).json ({error: 'Failed to dele product'});

  }

    } catch (error) {
      res.status(500).json ({ error: 'Failed to delete products'});

    }

  }
}

export default new ProductController();