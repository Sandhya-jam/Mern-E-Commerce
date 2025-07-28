import {createSlice} from '@reduxjs/toolkit'

const initialState=localStorage.getItem('cart')?JSON.parse(localStorage.getItem
('cart')) : {cartItems:[],shippingAddress:{},paymentMethod:'Paypal'}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
      addToCart:(state,action)=>{
        const {user,rating,numReviews,reviews,...item}=action.payload
        
      }
    }
})