import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import ProductList from './ProductList';

class Category extends Component {
    render() {
        const {products} = this.props;
        var category="";
        if (this.props.match !== undefined && this.props.match !== null) {
            category = this.props.match.params.category;  
        }
        return (
                <div className="dashboard container">
                    <div className="row">
                            <ProductList products={products} id="1" category={category}/>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' },
    ])
)(Category)














