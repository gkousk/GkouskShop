import React, { Component } from 'react';
import ProductList from '../orders/ProductList'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

class Products extends Component {
    render() {
        const { products, auth } = this.props;
        const id = this.props.match.params.id;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s6 m6">
                        <ProductList products={products} id={id} />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        products: state.firestore.ordered.products,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products', orderBy: ['name', 'desc'] }
    ])
)(Products) 