import React, { Component } from 'react'
import {SendMessage} from '../../store/actions/productActions'
import {connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class sendMessage extends Component {
  state={
    content:'',
    author:'',
    reciever:'',
    time:''
  }
  handleChange=(e)=>{
    
    this.setState({
        [e.target.id]:e.target.value,
        author:this.props.auth.email,
        reciever:"admin",
        time:new Date()
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.SendMessage(this.state);
  }
  render() {
    const {auth}=this.props;
    if(!auth.uid) return <Redirect to='/signin'/>
    return (
      <center>
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Contact us</h5>
            <div className="input-field">
                <label htmlFor="content">Message</label>
                <input type="text" id="content" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <button className="btn deep-purple darken-1 z-depth-0">Contact</button>
            </div>
           
       </form>
      </div>
      </center>
    )
  }
}
const mapStateToPorps =(state)=>{
  return{
    auth:state.firebase.auth
  }
}
const mapDispatchToProps=(dispatch) =>{
    return{
      SendMessage: (state) => dispatch(SendMessage(state))
    }
  }

export default connect(mapStateToPorps,mapDispatchToProps)(sendMessage)

  