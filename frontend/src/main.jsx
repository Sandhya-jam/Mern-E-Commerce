import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store.js'

//Auth
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'

import PrivateRoute from './Components/PrivateRoute.jsx'
import Profile from './Pages/User/Profile.jsx'

import AdminRoute from './Pages/Admin/AdminRoute.jsx'
import UserList from './Pages/Admin/UserList.jsx'
import CategoryList from './Pages/Admin/CategoryList.jsx'
import ProductList from './Pages/Admin/ProductList.jsx'
import ProductUpdate from './Pages/Admin/ProductUpdate.jsx'
import AllProducts from './Pages/Admin/AllProducts.jsx'
import Home from './Pages/Home.jsx'
import Favorites from './Pages/Products/Favorites.jsx'
import ProductDetails from './Pages/Products/ProductDetails.jsx'
import Cart from './Pages/Cart.jsx'
import Shop from './Pages/Shop.jsx'
import Shipping from './Pages/Orders/Shipping.jsx'
import PlaceOrder from './Pages/Orders/PlaceOrder.jsx'

import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import Order from './Pages/Orders/Order.jsx'
import UserOrder from './Pages/User/UserOrder.jsx'
import OrderList from './Pages/Admin/OrderList.jsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route index={true} path='/' element={<Home/>}/>
    <Route path='/favorite' element={<Favorites/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/users-orders' element={<UserOrder/>}/>
    <Route path='' element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile/>} />
      <Route path='/shipping' element={<Shipping/>}/>
      <Route path='/placeorder' element={<PlaceOrder/>}/>
      <Route path='/order/:id' element={<Order/>}/>
    </Route>
    
    {/* ADMIN ROUTES */}
    <Route path='/admin' element={<AdminRoute/>}>
      <Route path="userlist" element={<UserList/>}/>
      <Route path="categorylist" element={<CategoryList/>}/>
      <Route path='productlist' element={<ProductList/>}/>
      <Route path='allproducts' element={<AllProducts/>}/>
      <Route path='orderlist' element={<OrderList/>}/>
      <Route path='product/update/:_id' element={<ProductUpdate/>}/>
      <Route path='dashboard' element={<AdminDashboard/>}/>
    </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
);
