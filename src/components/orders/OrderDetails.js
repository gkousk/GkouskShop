import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'


class OrderDetails extends Component {

    state = {
        id: this.props.match.params.id
    }
    render() {
        const { products, order } = this.props;
        if (order !== null) {
            const ordProducts = order.products;
            const ordQuantities = order.quantities;
            var productArray = [];
            var total = 0;
            for (var i = 0; i < ordProducts.length; i++) {
                for (var key in products) {
                    if (key === ordProducts[i]) {
                        var orderProds = { img: products[key].image, name: products[key].name, quantity: ordQuantities[i], price: products[key].price };
                        productArray.push(orderProds);
                        var overal = ordQuantities[i] * products[key].price;
                        total += overal;
                    }
                }
            }
        }
        if (order !== null) {
            return (
                <div className="container" id="ord">
                    <div className="card" >
                        <div className="card-image waves-effect waves-block waves-light">

                        </div>
                        <div className="card-content">
                            <center>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><p>Product</p></th>
                                            <th><p>ProductName</p></th>
                                            <th><p>Quantity</p></th>
                                            <th><p>Price</p></th>
                                        </tr>
                                    </thead>
                                    {productArray && productArray.map(item => {
                                        var prc = item.quantity * item.price;
                                        return (

                                            <tbody>
                                                <tr className="grey-text">
                                                    <th><img alt="" className="cartImage" src={item.img}></img></th>
                                                    <th><p>{item.name}</p></th>
                                                    <th><p>{item.quantity}</p></th>
                                                    <th><p>{prc}</p></th>
                                                </tr>
                                            </tbody>


                                        )
                                    })}
                                    <tfoot id="end">
                                        <tr>
                                            <th></th>
                                            <th><p>Total Price:</p></th>
                                            <th id="tp">{total}</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </center>
                            <br />
                            <br />
                            <br />
                            <h6>SHIP TO</h6>
                            <table>
                                <thead>
                                    <tr>
                                        <th><p>Address</p></th>
                                        <th><p>First Name</p></th>
                                        <th><p>Last Name</p></th>
                                        <th><p>Phone Number</p></th>
                                        <th><p>Zip code</p></th>
                                        <th id="hidden"><p>City</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="grey-text">
                                        <th><p>{order.address}</p></th>
                                        <th><p>{order.fname}</p></th>
                                        <th><p>{order.lname}</p></th>
                                        <th><p>{order.number}</p></th>
                                        <th><p>{order.zipcode}</p></th>
                                        <th id="hidden"><p>{order.city}</p></th>
                                    </tr>
                                </tbody>
                                <tfoot id="end">
                                    <tr>
                                        <th></th>
                                        <th><p>Progress:</p></th>
                                        <th></th>
                                        <th className="green-text"><p>{order.progress}</p></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>

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

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const orders = state.firestore.data.orders;
    const order = orders ? orders[id] : null;
    return {
        products: state.firestore.data.products,
        order: order
    }
}
export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'products' },
        { collection: 'orders' }
    ])
)(OrderDetails);

