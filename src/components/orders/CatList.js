
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import Categories from '../orders/Categories';
import { Link } from 'react-router-dom';

class Cat extends Component {
    render() {
        const { categories } = this.props;
        var category = "";
        if (this.props.match !== undefined && this.props.match !== null) {
            category = this.props.match.params.category;
        }
        return (
             <div className="row">
           
                {categories && categories.map(cat => {
                    if (cat.categ === category) {
                        return (
                            <div className="row">
                            <div className="col s6 m6">
                            <Link to={'/category/' + cat.name} key={cat.name}>
                                    <Cat category={cat} />
                            </Link>
                            </div>
                            </div>
                            
                        )
                    }
                    else {
                        return null;
                    }
                })

                }
</div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categories' },
    ])
)(Cat)
