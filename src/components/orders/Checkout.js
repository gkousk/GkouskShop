import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { Order } from '../../store/actions/orderActions'
import { Elements, StripeProvider } from 'react-stripe-elements';
import CardDemo from './CardDemo';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pay: null,
      email: this.props.auth.email
    };
  }
  state = {
    email: this.props.auth.email,
    address: '',
    zipcode: '',
    city: '',
    number: '',
    products: [],
    quantities: [],
    fname: '',
    lname: '',
    card: '',
    pay: ''
  }
  myCallback = (dataFromChild) => {
    this.setState({ pay: dataFromChild });
    if (this.state.pay) {
      this.props.Order(this.state);
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var payment = document.getElementsByName("payment");
    for (var i = 0; i < payment.length; i++) {
      if (payment[i].checked) {
       var method = payment[i].value;
       console.log(method);
      }
    }

    if (method === "cash") {
      this.setState({
        products: this.props.cart.products,
        quantities: this.props.cart.quantities,
        fname: this.props.user.firstName,
        lname: this.props.user.lastName
      }, () => {
        console.log(this.props.email);
        this.props.Order(this.state);
      });
    }
    else if (method === "card") {
      this.setState({
        card: true,
        products: this.props.cart.products,
        quantities: this.props.cart.quantities,
        fname: this.props.user.firstName,
        lname: this.props.user.lastName
      })
      if (this.state.listDataFromChild) {
        console.log("hi");
      }
    }
  }

  render() {
    const { auth, message } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (this.props.match !== undefined && this.props.match !== null) {
      var price = this.props.match.params.price;
    }
    return (
      <center>
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Ship to</h5>
            <div className="input-field" >
              <label htmlFor="address">Address</label>
              <input type="text" id="address" onChange={this.handleChange} required="required" />
            </div>
            <div className="input-field">
              <label htmlFor="zipcode">Zip code</label>
              <input type="text" id="zipcode" onChange={this.handleChange} required="required" />
            </div>
            <div className="input-field">
              <label htmlFor="city">City</label>
              <input type="text" id="city" onChange={this.handleChange} required="required" />
            </div>
            <div className="input-field">
              <label htmlFor="number">Phone number</label>
              <input type="text" id="number" onChange={this.handleChange} required="required" />
            </div>

            <label>
              <input name="payment" type="radio" value="card" checked />
              <span>Card</span>
            </label>
            <label>
              <input name="payment" value="cash" type="radio" />
              <span>Cash on delivery</span>
            </label>




            <div className="green-text center">
              {message ? <p>{message}</p> : null}
            </div>

            <div className="input-field">
              <button className="btn deep-purple darken-1 z-depth-0">Order</button>
            </div>
            <div>

              {this.state.card
                ? <StripeProvider apiKey="pk_test_2bkHONKOs2kmlARzeeRH8TTS00UEKHKG7q">
                  <div>
                    <Elements>
                      <CardDemo p={price} state={this.state} callbackFromParent={this.myCallback} />
                    </Elements>
                  </div>
                </StripeProvider>
                : null
              }
            </div>

            <div>

            </div>
          </form>
        </div>
      </center>
    )

  }
}

const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  const email = state.firebase.auth.email;
  const users = state.firestore.data.users;
  const user = users ? users[uid] : null;
  const cart = state.firestore.data.cart;
  const cartm = cart ? cart[email] : null;
  return {
    user: user,
    cart: cartm,
    auth: state.firebase.auth,
    message: state.product.message
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    Order: (orde) => dispatch(Order(orde))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'cart' },
    { collection: 'users' }
  ])
)(Checkout);

