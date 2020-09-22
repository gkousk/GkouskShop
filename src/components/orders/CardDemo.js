import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Order } from '../../store/actions/orderActions'
import axios from 'axios';

class CardDemo extends Component {
    
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }
    async submit(p, state) {
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        var price = token.id + "," + p;
        var response= await fetch('http://192.168.1.41:9000/charge', {
            method: "POST",
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {"Content-Type": "text/plain"},
            body: price
        });
        console.log(response);

        if (response) this.setState({ complete: true });
            this.props.callbackFromParent(this.state.complete);
    }

    render() {
        const { p, state } = this.props;
        console.log(state);
        if (this.state.complete) return <p>Purchase Complete</p>;
        return (
            <div className="checkout" >
                <CardElement />
                <button onClick={() => this.submit(p, state)}>Pay</button>
            </div>
        );
    }
}

export default injectStripe(CardDemo);