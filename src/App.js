import React, { Suspense, useEffect} from 'react';
import { BrowserRouter as Router, Route,  Switch, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoginSelector } from './redux/users/ducks';
import Dashboard from './pages/Dashboard';
import AuthorPage from './pages/AuthorPage';
import BookPage from './pages/BookPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/App.css';





const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(setLoginSelector);
  
  useEffect(() => {
    async function authCheck() {
      await firebase.auth().onAuthStateChanged( async (user) => {
       
        if (user) {
          const userData = await firebase.firestore().collection('users').doc(user.uid).get().then((doc) => doc.data());
          dispatch(setUser(userData, true));
          
        }
      });
    }
  
    authCheck();
  });

  
  const ProtectedRoute = (props) => {
    if (isLogin) {
      return <Route {...props} />;
    }else{

    return <Redirect to='/' />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<></>}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/authors/:id' component={AuthorPage} />
            <ProtectedRoute exact path='/books/:id' component={BookPage} />
            <Route  path='*' component={NotFoundPage} />
          </Switch>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
