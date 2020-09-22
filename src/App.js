import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'
import MessageList from './components/dashboard/MessageList'
import Cart from './components/orders/Cart'
import ProductDetails from './components/orders/ProductDetails'
import Notifications from './components/orders/Notifications'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Checkout from './components/orders/Checkout';
import CardDemo from './components/orders/CardDemo';
import 'materialize-css/dist/css/materialize.min.css';
import sendMessage from './components/dashboard/sendMessage'
import Cat from './components/orders/Cat';
import Category from './components/orders/Category';
import OrderDetails from './components/orders/OrderDetails'
import payWithCard from './components/orders/payWithCard'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/categories/:category' component={Cat} />
            <Route path='/category/:category' component={Category} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/messages' component={MessageList} />
            <Route path='/orders' component={Notifications} />
            <Route path='/sendMessage' component={sendMessage} />
            <Route path='/cart/' component={Cart} />
            <Route path='/product/:id' component={ProductDetails} />
            <Route path='/checkout/:price' component={Checkout} />
            <Route path='/checkoutCard/:id' component={payWithCard} />
            <Route path='/order/:id' component={OrderDetails} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
