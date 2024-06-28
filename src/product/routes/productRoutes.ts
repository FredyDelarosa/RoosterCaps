import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware } from '../../shared/middlewares/auth';

const productRoutes :Router = Router();

productRoutes.get('/products', authMiddleware, getProducts);
productRoutes.get('/products/:id', authMiddleware, getProductById)
productRoutes.post('/products', authMiddleware, createProduct);
productRoutes.put('/products/:id', authMiddleware, updateProduct);
productRoutes.delete('/products/:id', authMiddleware, deleteProduct);

export default productRoutes;
