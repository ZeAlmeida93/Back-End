import express, { Request, Response } from 'express';
import { IProduct } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';

const productsFilePath = './src/data/products.json';

class ProductController {

    private readProducts(): IProduct[] {
console.log(jsonFileReader.read(productsFilePath));
        return jsonFileReader.read(productsFilePath);
    }

    private writeProducts(products: IProduct[]):void {

        return jsonFileReader.write(productsFilePath, products);
    }

getAll(req: Request, res: Response) {
 
    const products: IProduct[] = jsonFileReader.read(productsFilePath);
    res.json(products);


}
getOne(req: Request, res: Response) {


    const productId: number = parseInt(req.params.id);
    const products: IProduct[] = jsonFileReader.read(productsFilePath);

    console.log(req.params.id)
  
    const foundProduct: IProduct | undefined = products.find(product => product.id === productId);
  
    if (!foundProduct) {
      res.status(404).json({ error: 'Product not found' });
    }
  
    res.json(foundProduct);


}
create(req: Request, res: Response) {}
update(req: Request, res: Response) {}
delete(req: Request, res: Response) {}

}

export default new ProductController();