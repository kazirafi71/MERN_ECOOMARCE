import './App.css';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

import {BrowserRouter,Redirect,Route,Switch, useHistory} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

import Createpost from './pages/Createpost';
import Profile from './pages/Profile';
import UserDashboard from './pages/UserDashboard';
import { useDispatch } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import AdminDashBoard from './pages/AdminDashBoard';
import AdminPrivate from './components/AdminPrivate';
import UserPrivate from './components/UserPrivate';
import NotFound from './pages/NotFound';
import UpdateProduct from './components/UpdateProduct';
import EditProductPrivate from './components/EditProductPrivate';


 const Routing=()=>{
  const history=useHistory()
  const dispatch = useDispatch()
  let userInfo=JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("user"))
    console.log(user)
    
     if(!user){
      history.push('/login')
      

    }
    else{
      dispatch({type: 'SET_USER', payload: user})
      
    }
    
  },[])
   return(
  <Switch>
  <Route path='/' exact>
    <Home/>
  </Route>
  <Route path='/login' exact>
    <Login/>
  </Route>
  <Route path='/register' exact>
    <Register/>
  </Route>
  <PrivateRoute path='/profile' exact>
    <Profile/>
  </PrivateRoute>
  <AdminPrivate path='/product/:postId' exact>
    <UpdateProduct/>
  </AdminPrivate>
  <UserPrivate path='/user/dashboard' exact>
    <UserDashboard/>
  </UserPrivate>
  <AdminPrivate path='/admin/dashboard' exact>
    <AdminDashBoard/>
  </AdminPrivate>
  <Route path='*'>
    <NotFound/>
  </Route>
</Switch>

  )
 }





function App() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("orange");

 
  
  return (

   
  <>
      <Navbar/>
     
     <Routing/>
    </>
    
    

   
  );
}

export default App;