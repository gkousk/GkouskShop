
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
             <div className="col s12 m12 l12">
                {categories && categories.map(cat => {
                    if (cat.categ === category) {
                        return (
                            <Link to={'/category/' + cat.name} key={cat.name}>
                                    <Categories category={cat} />
                            </Link>  
                        )
                    }
                    else {
                        return null;
                    }
                })

                }
       </div>
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

