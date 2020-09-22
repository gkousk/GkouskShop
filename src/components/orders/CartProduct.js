import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { DeleteProduct } from '../../store/actions/productActions'
import { ChangeQuantities } from '../../store/actions/productActions'
import 'react-base-table/styles.css'

class CartProduct extends Component {
  state = {
    email: this.props.auth.email,
    quantities: this.props.quantities,
    products: this.props.p
  }

  handleChange = (e) => {
    for (var i = 0; i < this.props.cart.products.length; i++) {
      if (this.props.product === this.props.cart.products[i]) {
        this.props.quantities[i] = parseInt(e.target.value);
      }
    }

    this.setState({
      quantities: this.props.quantities
    }, () => {
      this.props.ChangeQuantities(this.state);
    });
  }

  handleDelete = (e) => {
    e.preventDefault();
    var productDel = e.target.id;
    if (this.props.product === productDel) {
      const index = this.props.p.indexOf(this.props.product);
      this.props.quantities.splice(index, 1);
      this.props.p.splice(index, 1);
      this.setState({
        quantities: this.props.quantities,
        products: this.props.p
      }, () => {
        this.props.DeleteProduct(this.state);
      });
      setTimeout(function(){
         window.location.reload();
       }, 300);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {

    const { auth, array, p, product, quantities, counter, products } = this.props;
    var productArray = [];
    var cartProducts = [];
    cartProducts = p;
    for (var key in products) {
      productArray.push(key);
    }

    if (!auth.uid) return <Redirect to='/signin' />
    var tot = 0;

    for (var i = 0; i < p.length; i++) {
      if (products[p[i]] !== undefined) {
        var a = quantities[i] * products[p[i]].price;
        tot = tot + a;
      }
    }


    var overal = products[product].price * quantities[counter];
    var q = quantities[counter];

    return (
      <tr>
        <th><img alt="" className="cartImage" src={products[product].image}></img></th>
        <th><p id="prodName">{products[product].name}</p></th>
        <th><input type="number" min="1" max="20" id={product} defaultValue={q} onChange={this.handleChange} /></th>
        <th><a className="black-text" id={product} href="" onClick={this.handleDelete}><i id="icon" className="material-icons">delete</i></a></th>
        <th><p id="price">{products[product].price} €</p></th>
        <th><p id="overal" >{overal} €</p></th>
      </tr>
    )

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
    ChangeQuantities: (quantities) => dispatch(ChangeQuantities(quantities)),
    DeleteProduct: (state) => dispatch(DeleteProduct(state))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'cart' },
    { collection: 'products' }
  ])
)(CartProduct);

