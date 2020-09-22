import React, { Component } from 'react';
import { connect } from 'react-redux'
class Footer extends Component {
  render() {
   

    return (
      <div>
        <footer className="page-footer grey darken-2" id="worktime">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Working Time</h5>
                <p className="grey-text text-lighten-4">Monday - Friday: 09:00 - 19:00</p>
                <p>Saturday: 09:00 - 16:00</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Contact us</h5>
                <ul>
                    <li><a href="/sendMessage" ><h6 className="white-text">Send Message</h6></a></li>
                    <li><h6 className="white-text">Phone Number: </h6><h6 className="white-text">2821000000</h6></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2019 Gkousk-shop
            </div>
          </div>
        </footer>

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

export default connect(mapStateToProps)(Footer) 