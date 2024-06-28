import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Product } from '../models/productModel';

export class ProductRepository {

  public static async findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productos', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          resolve(products);
        }
      });
    });
  }

  public static async findById(id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM productos WHERE id = ?', [id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          if (products.length > 0) {
            resolve(products[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const query = 'INSERT INTO productos (name, price) VALUES (?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product.name, product.price], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductId = result.insertId;
          const createdProduct: Product = { ...product, id: createdProductId };
          resolve(createdProduct);
        }
      });
    });
  }

  public static async updateProduct(id: number, productData: Product): Promise<Product | null> {
    const query = 'UPDATE productos SET name = ?, price = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productData.name, productData.price, id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedProduct: Product = { ...productData, id: id };
            resolve(updatedProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProduct(id: number): Promise<boolean> {
    const query = 'DELETE FROM productos WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

}

