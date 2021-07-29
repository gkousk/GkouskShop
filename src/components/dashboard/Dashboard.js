import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import ProductSummary from '../orders/ProductSummary'

class Dashboard extends Component {
    render() {
        const { hots} = this.props;
        return (
            <div>
            <div className="row" id="imageboard">
                    <br/>
                    <div className="col s6 m4 l4" >
                        <img alt="" className="activator" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-96xsmoNlGs2tgymqIZLFmxIrA99Hboeehw&usqp=CAU"></img>
                    </div>
                    <div className="col s6 m4 l4" >
                        <img alt="" className="activator" src="https://images8.alphacoders.com/693/thumb-350-693887.jpg"></img>
                    </div>
                    <div className="col s12 m4 l4" id="dashimg">
                        <img alt="" className="activator" src="https://techsightings.com/wp-content/uploads/2017/09/Acer-Predator-17-X.jpg"></img>
                    </div>
                </div>
                <div className="simage">
                    <img alt="" id="imag" src="https://cwsmgmt.corsair.com/pdp/vengeance_pc_5180/images/vengeance_pc_still.jpg"></img>
                </div>
                <br/>
            <div id='hots' >
            <div className="container" >
            
                <br/>
                
                <div className="row">
                    {hots && hots.map(hot => {
                        var id = "dashboard"+hot.id;
                        return (
                            <div className="col s6 m6 l4" key={hot.name}>
                                <Link to={'/product/' + hot.id} key={id} >
                                    <ProductSummary product={hot} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div>
                </div>
                </div>
            </div>
           
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        hots: state.firestore.ordered.hots,
        products: state.firestore.ordered.products
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'hots', orderBy: ['id', 'desc'] },
        { collection: 'products', orderBy: ['name', 'desc'] }
    ])
)(Dashboard) 