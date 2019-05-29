import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Movies from "./components/movies";
import MoviesForm from './common/movieForm';
import Customers from './common/customers';
import Rentals from './common/rentals.jsx';
import Notfound from './common/not-found';
import NavBar from './components/navBar';
import {ToastContainer} from 'react-toastify'
import LoginForm from './components/loginForm';
import Register from './common/register';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <ToastContainer/>
      <NavBar/>
        <main className="container">
        <Switch>
            <Route path="/movies/:id" component={MoviesForm}/>
            <Route path="/movies" component={Movies}/>
          
            <Route path="/rental" component={Rentals}/>
            <Route path="/register" component={Register}/>  
            <Route path="/login" component={LoginForm}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/not-found" component={Notfound}/>
            <Redirect from="/" to='movies'/> 
            <Redirect  to='/not-found'/>
        </Switch>
        </main>
    </React.Fragment>
    );
}

export default App;
