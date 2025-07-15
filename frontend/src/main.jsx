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

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

    <Route path='' element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile/>} />
    </Route>
    
    {/* ADMIN ROUTES */}
    <Route path='/admin' element={<AdminRoute/>}>
      <Route path="userlist" element={<UserList/>}/>
    </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);
