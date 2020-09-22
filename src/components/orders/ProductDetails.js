import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { AddToCart } from '../../store/actions/productActions'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    id: this.props.match.params.id,
    email: ''
  }
  handleClick() {
    this.setState({
      email: this.props.auth.email
    }, () => {
      var cartList = [];
      for (var key in this.props.cart) {
        if (key === this.props.auth.email) {
          cartList = this.props.cart[key].products;
        }
      }
      if (!cartList.includes(this.state.id)) {
        this.props.AddToCart(this.state);
      }
    });
  }

  render() {
    const { auth, product, message } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    if (product) {
      return (
        <div>
          <br/>
        <div className="container white">
          <div class="row">
            <div class="col s6 m6 l6">
              <img alt="" className="productImage" src={product.image}></img>
            </div>
            <div class="col s6 m6 l6">

              <span class="black-text right">
              <center>
              <h5>{product.name}</h5>
              <h7>{product.description}</h7>
              <h6>{product.price} €</h6>
               </center>
              </span>
              <center>
                
              <button onClick={this.handleClick} className="btn deep-purple darken-1">Add to cart </button>
              </center>
              <div className="green-text center">
                {message ? <p>{message}</p> : null}
              </div>


            </div>
          </div>
        </div>
        </div>

      )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const cart = state.firestore.data.cart;
  const product = products ? products[id] : null;

  return {
    product: product,
    auth: state.firebase.auth,
    cart: cart,
    message: state.product.message
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
    { collection: 'products' },
    { collection: 'cart' }
  ])
)(ProductDetails);

