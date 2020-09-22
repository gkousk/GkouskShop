import React, { Component } from 'react';
import Messages from './Messages'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

class MessageList extends Component {
    render() {
        const { auth, messages } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m10 l10 offset-m1 offset-l1">
                        <Messages messages={messages} auth={auth} />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        messages: state.firestore.ordered.messages
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'messages', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(MessageList) 