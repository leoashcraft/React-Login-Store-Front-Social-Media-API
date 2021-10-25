import { Route, Switch } from 'react-router';
import React, { useState } from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import Allproducts from './pages/Allproducts';
import Createproduct from './pages/Createproduct';
import Deleteproduct from './pages/Deleteproduct';
import Updateproduct from './pages/Updateproduct';
import Singleproduct from './pages/Singleproduct';
import Login from './pages/Login';
import Cart from './pages/Cart';

import { UserContext } from './UserContext'
function App() {

  const username = localStorage.getItem('user')
  const [ token, setToken ] = useState(true)
  const [user, setUser] = useState(username)
  const [cart, setCart] = useState([])
  
  function isThere(id) {
    return cart.some(i => i.id === id)
  }

  function getCartTotal() {
    let total = 0
    cart.map(item => {
      total += item.price 
    })
    return total;
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const value = {
    token, setToken, 
    user, setUser, 
    cart, setCart, 
    checkT: isThere,
    getTotal : getCartTotal
  }

  const existingToken = getToken();

  if (!existingToken) {
    return <UserContext.Provider value={value}> 
          <Login />
      </UserContext.Provider>

  }
  return (
      <UserContext.Provider value={value}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Allproducts />
          </Route>
          <Route path="/createproduct">
            <Createproduct />
          </Route>
          <Route path="/updateproduct/:id" render={(props) => <Updateproduct {...props} />} />
          <Route path="/deleteproduct/:id" render={(props) => <Deleteproduct {...props} />} />
          <Route path="/product/:id" render={(props) => <Singleproduct {...props} />} />
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
      </UserContext.Provider>
  );
}

export default App;
