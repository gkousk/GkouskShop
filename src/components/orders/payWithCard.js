import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CardDemo from './CardDemo';

class payWithCard extends Component {
  render() {
    var p=1000;
    return (
      <StripeProvider apiKey="pk_test_2bkHONKOs2kmlARzeeRH8TTS00UEKHKG7q">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CardDemo p={p} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default payWithCard;