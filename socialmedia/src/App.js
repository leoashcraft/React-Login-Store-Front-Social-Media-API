import { Route, Switch } from 'react-router';
import React, { useState, useEffect} from 'react';
import './App.css';
import Allposts from './pages/Allposts';
import Layout from './components/layout/Layout';
import { UserContext } from './UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Editpost from './pages/Editpost'
import Deletepost from './components/Deletepost';

function App() {
  const username = sessionStorage.getItem('user')
  const [ token, setToken ] = useState(true)
  const [user, setUser] = useState(username)
  const [tokenStr, setTokenStr] = useState(sessionStorage.getItem('token'))
  const [clicked, setClick] = useState(false)
  const [postadded, setPostAdded] = useState(false)
  const [login, setLogin] = useState(false)
  const [auth, setAuth] = useState(false)


  const getToken = () => {
    return sessionStorage.getItem('token')
  }


  const value = {
    token, setToken, 
    user, setUser, 
    tokenStr, setTokenStr,
    clicked, setClick,
    postadded, setPostAdded,
    login, setLogin,
    auth, setAuth,
  }

  const existingToken = getToken();


if (auth) {
  return (
    <UserContext.Provider value={value}> 
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Allposts />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/updatepost/:id" render={(props) => <Editpost {...props} />} />
          <Route path="/deletepost/:id" render={(props) => <Deletepost {...props} />} />
          <Route path="/post/:id" render={(props) => <Post {...props} />} />
        </Switch>
      </Layout>
    </UserContext.Provider>
  );
}

else if (login) {
  return <UserContext.Provider value={value}> 
    <Login />
  </UserContext.Provider>
}
else if (!existingToken) {
  return <UserContext.Provider value={value}> 
    <Register />
  </UserContext.Provider>
}
 
  return (
    <UserContext.Provider value={value}> 
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Allposts />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/updatepost/:id" render={(props) => <Editpost {...props} />} />
          <Route path="/deletepost/:id" render={(props) => <Deletepost {...props} />} />
          <Route path="/post/:id" render={(props) => <Post {...props} />} />
        </Switch>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
