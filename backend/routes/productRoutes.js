import express from "express";
import formidable from 'express-formidable'
const router=express.Router();

//Controllers
import {addProduct,updateProductDetails,removeProduct,
fetchProducts,fetchProductById,fetchAllProducts,addProductReviews,
fetchTopProducts,fetchNewProducts} from '../Controllers/productController.js'
import { authenticate,authorizeAdmin } from "../Middlewares/authMiddleware.js";
import checkId from "../Middlewares/checkId.js";

router.route('/')
        .get(fetchProducts)
        .post(authenticate,authorizeAdmin,formidable(),addProduct)

router.route('/allproducts').get(fetchAllProducts)

router.route('/top').get(fetchTopProducts)
router.get('/new',fetchNewProducts)

router.route('/:id')
        .get(fetchProductById)
        .put(authenticate,authorizeAdmin,formidable(),updateProductDetails)
        .delete(authenticate,authorizeAdmin,removeProduct)

router.route('/:id/reviews')
        .post(authenticate,checkId,addProductReviews)
export default router;