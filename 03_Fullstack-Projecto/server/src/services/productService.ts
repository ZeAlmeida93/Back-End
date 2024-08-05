import { IProduct } from './../interfaces/interfaces';


import { IProduct } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import productModel from '../models/productModel.js'

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
            return await productModel.find();

            return this.readProductsJson();
        } catch (error) {
            // console.log(error);
        }
    }

    getProductById = async (productId: string): Promise<IProduct | null> => {
        try {
            const foundProduct: IProduct | null = await productModel.findById(productId);

            return foundProduct;
        } catch (error) {
            throw new Error('Failed to get product by ID');
        }
    }
    create = async (newProduct: IProduct): Promise<IProduct> => {
        try {
            const createdProduct = await productModel.create(newProduct);
            console.log(createdProduct)
            return createdProduct;


        } catch (error) {
            throw new Error('Failed to create Products');
        }
    }
    // update = (productID: string, product: IProduct): IProduct => {
    //     try {
    //         const products: IProduct[] | undefined = this.readProductsJson();
    //         if (!products) {

    //             throw new Error('Failed to read products');
    //         }

    //         const productIndex: number = products.findIndex(product => product.id === productID);

    //         if (productIndex === -1) {

    //             throw new Error('Product not found');
    //         }

    //         const productToUpdateWithID = { ...products[productIndex], ...product } // merge product with ID
    //         console.log(productToUpdateWithID);
    //         products[productIndex] = productToUpdateWithID; //update product

    //         this.writeProductsJson(products);
    //         return productToUpdateWithID;

    //     } catch (error) {
    //         throw new Error('Failed to update Product');
    //     }
    // }
    delete = async (productId: string): Promise<IProduct | null> => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId); // Delete Product
            // productModel.deleteOne({ _id: productId })

            return deletedProduct;


        } catch (error) {
            // console.log(error);
        }
    }
}

export default new ProductService();