import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import store from './store';
import {loadUser} from './actions/authActions';

import Home from './Views/Home';
import Showroom from './Views/Showroom';
import Cart from './Views/Cart';
import ContactUs from './Views/ContactUs';


import Orders from './Views/Orders';
import Bills from './Views/Bills';
import Profile from './Views/Profile';
import Buckets from './Views/Buckets';
import Items from './Views/Items';
import SellersInfo from './Views/SellersInfo';
import OrderInfo from './Views/OrderInfo';
import ItemInfo from './Views/ItemInfo';

import './App.css';
import './bootstrap.css';

class App extends Component {
  componentDidMount = ()=>{
    if(localStorage.getItem('token')!==null){
      store.dispatch(loadUser());
    }
  }

  render() {
      return (
        <Router>
          <div className="App">

  
            

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/showroom" component={Showroom}/>
              <Route exact path="/contact-us" component={ContactUs}/>
              <Route exact path="/cart" component={this.props.isAuthenticated? Cart: Home}/>
              <Route exact path="/bills" component={this.props.isAuthenticated? Bills: Home}/>
              <Route exact path="/profile" component={this.props.isAuthenticated? Profile: Home}/>

              <Route path="/dashboard/orders" component={this.props.isAdmin ? Orders: Home}/>
              <Route path="/dashboard/items" component={this.props.isAdmin? Items: Home}/>
              <Route path="/item-info" component={this.props.isAdmin? ItemInfo: Home}/>
              <Route path="/dashboard/sellers-info" component={this.props.isAdmin? SellersInfo: Home}/>
              <Route path="/order-info" component={this.props.isAdmin? OrderInfo: Home}/>
              <Route path="/dashboard/bucket" component={this.props.isAdmin? Buckets: Home}/>
            </Switch>
          </div>
        </Router>
      )
    
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(App);