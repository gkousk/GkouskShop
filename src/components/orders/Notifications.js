import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import Notification from './Notification'

class Notifications extends Component {
    render() {
        const { auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        console.log(notifications);
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12 l12 offset-m1">
                        <div className="section">
                            <div className="card z-depth-0">
                                <div className="card-content">
                                    <span className="card-title">Orders</span>
                                    <div className="notifications">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th><p>Order #</p></th>
                                                    <th><p>Date</p></th>
                                                    <th><p>Progress</p></th>
                                                    <th><p>Action</p></th>
                                                </tr>
                                            </thead>
                                            {notifications && notifications.map(notification => {
                                                console.log(auth.email);
                                                console.log(notification.email);
                                                if (auth.email === notification.email) {
                                                    return (
                                                        <Notification notification={notification} auth={auth} />
                                                    )
                                                }
                                                else {
                                                    return null;
                                                }
                                            })}
                                        </table>
                                    </div>
                                </div>
                            </div>
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
        notifications: state.firestore.ordered.orders,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'orders', orderBy: ['time', 'desc'] }
    ])
)(Notifications) 