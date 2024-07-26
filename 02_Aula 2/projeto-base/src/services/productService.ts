

import { IProduct } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';

const productsJsonPath: string = './src/data/products.json'

class ProductService {

    private readProductsJson(): IProduct[] | undefined {
        try {
            const data = jsonFileReader.read(productsJsonPath);


            console.log(data)
            return data

        } catch (error) {

        } throw new Error('Failed to read products from file');


    }

    private writeProductsJson(products: IProduct[]): void {

        try {

            jsonFileReader.write(productsJsonPath, products);


        } catch (error) {

            throw new Error('Failed to write products from file');
        }
    }
    getAll = async () => {
        try {

            return this.readProductsJson();
        } catch (error) {
            // console.log(error);
        }
    }
    getProductbyId = (productID: string): IProduct | undefined => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();

            const foundProduct = products?.find(product => product.id === productID);

            return foundProduct;


        } catch (error) {
            // console.log(error);
        }
    }
    create = (newProduct: IProduct): IProduct | undefined => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();
            console.log(products);

            if (!products) {

                throw new Error('Failed to read products');
            }

            newProduct.id = uuidv4(); //gerador de IDs


            products?.push(newProduct);

            this.writeProductsJson(products);
            return newProduct;



        } catch (error) {
            throw new Error('Failed to create Products');
        }
    }
    update = (productID: string, product: IProduct): IProduct => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();
            if (!products) {

                throw new Error('Failed to read products');
            }

            const productIndex: number = products.findIndex(product => product.id === productID);

            if (productIndex === -1) {

                throw new Error('Product not found');
            }

            const productToUpdateWithID = { ...products[productIndex], ...product } // merge product with ID
            console.log(productToUpdateWithID);
            products[productIndex] = productToUpdateWithID; //update product

            this.writeProductsJson(products);
            return productToUpdateWithID;

        } catch (error) {
            throw new Error('Failed to update Product');
        }
    }
    delete = async (req: Request, res: Response) => {
        
        try {
            const productId: string = req.params.id;
            const deletedProduct: IProduct | undefined = productService.delete(productId);

            if (!deletedProduct) {
                res.status(404).json({ error: '' });
            }
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
}

export default new ProductService();