import express from "express"
import {createUser,loginUser,logoutUser,getAllUsers,
   getCurrentUserProfile,updateCurrProfile,deleteUserById,
   getUserById,updateUserById
} from "../Controllers/userController.js"

import { authenticate,authorizeAdmin} from "../Middlewares/authMiddleware.js";

const router=express.Router()

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.route('/auth').post(loginUser);
router.post('/logout',logoutUser)
router.route('/profile')
      .get(authenticate,getCurrentUserProfile)
      .put(authenticate,updateCurrProfile)

//ADMIN ROUTES
router.route('/:id')
       .delete(authenticate,authorizeAdmin,deleteUserById)
       .get(authenticate,authorizeAdmin,getUserById)
       .put(authenticate,authorizeAdmin,updateUserById)

export default router;  