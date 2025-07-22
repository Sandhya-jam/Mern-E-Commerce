import express from "express";
const router=express.Router()
import { createCategory,updateCategory,
    deleteCategory,listCategory,readCategory
} from "../Controllers/categoryController.js";
import { authenticate,authorizeAdmin } from "../Middlewares/authMiddleware.js";

router.route("/").post(authenticate,authorizeAdmin,createCategory);
router.route('/:categoryId')
    .put(authenticate,authorizeAdmin,updateCategory)
    .delete(authenticate,authorizeAdmin,deleteCategory)

router.route('/categories').get(listCategory);
router.route('/:id').get(readCategory);
export default router;