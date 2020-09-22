import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AddToCart } from '../../store/actions/productActions'
import 'react-base-table/styles.css'
import CartProduct from './CartProduct';

class Cart extends Component {
  render() {

    const { auth, cart, prod } = this.props;
    var counter = -1;
    var total = 0;
    var productArray=[];
    
    if (!auth.uid) return <Redirect to='/signin' />
    if (cart) {
      var products = cart.products;
      var quantities = cart.quantities;
      for (var key in prod) {
        productArray.push(key);
      }
      
      return (
        <div className="container">
          <br/>
          <div id="cart">
            <table>
              <thead>
                <tr className="tr">
                  <th>Product</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                  <th>Price</th>
                  <th id="ovalue">Overall Value</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map(product => {
                  counter++;
                  if (prod !== undefined) {
                    total = total + prod[product].price * quantities[counter];
                    return (
                      <CartProduct p={products} product={product} quantities={quantities} counter={counter} products={prod} key={product}/>
                    )
                  }
                  else{
                    return null;
                  }
                  }
                )}
              </tbody>
              <tfoot id="end">
                <tr>
                  <th></th>
                  <th><Link to={"/checkout/"+total}><button className="btn deep-purple darken-1">Checkout</button>
                  </Link></th>
                  <th></th>
                  <th id="total">Total Price:</th>
                  <th id="tp">{total} €</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <br/>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const email = state.firebase.auth.email;
  const cart = state.firestore.data.cart;
  const cartm = cart ? cart[email] : null;
  const prod = state.firestore.data.products;
  return {
    prod: prod,
    cart: cartm,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    AddToCart: (product) => dispatch(AddToCart(product))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'cart'},
    { collection: 'products'}
  ])
)(Cart);

