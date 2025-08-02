import express from "express";

const router=express.Router()

import{authenticate,authorizeAdmin}from '../Middlewares/authMiddleware.js'
import {createOrder,getAllOrders,getUserOrders,
countTotalOrders,calculateTotalSales,calculateTotalSalesByDate,
findOrderById,markOrderAsPaid,markOrderAsDelivered} from '../Controllers/orderController.js'

router.route('/').post(authenticate,createOrder)
                 .get(authenticate,authorizeAdmin,getAllOrders)

router.route('/myorders').get(authenticate,getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calculateTotalSalesByDate)
router.route('/:id').get(authenticate,findOrderById)
router.route('/:id/pay').put(authenticate,markOrderAsPaid)
router.route('/:id/deliver').put(authenticate,authorizeAdmin,markOrderAsDelivered)
export default router; 