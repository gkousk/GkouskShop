import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const Notification = (props) => {
    const { notification } = props;
    const quantities = notification.quantities;
    console.log(notification);
    return (
       
            <tbody>
                <tr className="grey-text">
                    <th><p>{notification.id}</p></th>
                    <th><p>{moment(notification.time.toDate().toString()).format("DD-MM-YYYY hh:mm:ss")}</p></th>
                    <th><p>{notification.progress}</p></th>
                    <th><p><NavLink to={'/order/'+notification.id} ><a href="/" className="orderhref">Show order</a></NavLink></p></th>
                </tr>
            </tbody>
       

    )
}

export default Notification;