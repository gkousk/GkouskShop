import React, { Component } from 'react';
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import { connect } from 'react-redux'
import M from 'materialize-css';

class Navbar extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    const { auth } = this.props;
    const { profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />

    return (
      <div>
        <nav className="nav-extended grey darken-3" id="navbar">
          <div className="container" id="1">
            <div className="nav-wrapper" id="2">
            <a href="/" className="brand-logo" id="logo">Gkousk Shop</a>
              {links}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar) 