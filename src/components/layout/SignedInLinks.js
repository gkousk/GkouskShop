import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'

const SignedInLinks = (props) => {

  return (
    <ul>
      <ul id="nav-mobile" className="right">
        <li id="msg"><NavLink to='/messages' className='btn btn-floating deep-purple darken-1'><i className="material-icons">mode_comment</i></NavLink></li>
        <li id="profile"><a href="#" className='dropdown-trigger btn btn-floating deep-purple darken-1' data-target='dropdown4'> {props.profile.initials}</a></li>
      </ul>
      <br />
      <ul>
        <li id="li1"><a href="#" id="catdropdown" className="btn dropdown-trigger" data-target='dropdown1'>
          <i className="large material-icons left" id="iconcgr">dehaze</i>
          <p id="par1">Categories</p></a></li>

        <li className="right"><a id="cartbtn" href="/cart" className="btn right"><i id="iconcr" className="material-icons left">shopping_cart</i><p id="par">Shopping Cart</p></a></li>
      </ul>
      <ul id="dropdown1" className='dropdown-content'>
        <li><NavLink to={'/categories/peripherals'} ><h6>PERIPHERALS</h6></NavLink></li>
        <li><NavLink to={'/categories/pc'}><h6>PC</h6></NavLink></li>
        <li><NavLink to={'/categories/hardware'} ><h6>HARDWARE</h6></NavLink></li>
        <li><NavLink to={'/categories/mobile'} ><h6>MOBILE</h6></NavLink></li>
        <li><NavLink to={'/categories/tv'} ><h6>TV AND AUDIO</h6></NavLink></li>
      </ul>
      <ul id='dropdown4' className='dropdown-content'>
        <li><a href="/orders"><h6>Orders</h6></a></li>
        <li><a href="/#" onClick={props.signOut}><h6>Logout</h6></a></li>
      </ul>
    </ul>

  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}
const mapStateToProps = (state) => {

  return {
    categories: state.firestore.ordered.categories,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'categories', orderBy: ['name', 'desc'] }
  ])
)(SignedInLinks) 