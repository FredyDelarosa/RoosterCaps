import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { Product } from '../models/productModel';

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductById(parseInt(req.params.id, 10));
    if(product){
      res.status(201).json(product);
    }else{
      res.status(404).json({message: 'Product not found' })
    }
  } catch (error : any) {
    res.status(500).json({error: error.message})
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newItem: Product = req.body;
    await ProductService.createProduct(newItem);
    res.status(201).send('Producto creado');
  } catch (err) {
    res.status(500).send('Error al crear el producto');
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedItem: Product = req.body;
    await ProductService.updateProduct(parseInt(req.params.id, 10), updatedItem);
    res.send('Producto actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await ProductService.deleteProduct(parseInt(req.params.id, 10));
    res.send('Producto eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
};
