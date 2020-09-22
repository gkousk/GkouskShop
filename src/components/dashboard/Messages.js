import React from 'react';
import moment from 'moment';

const Messages = (props) => {
    const { messages, auth } = props;
    return (
        <div className="section">
            <div className="card z-depth-0" >
                <div className="card-content">
                    <span className="card-title">Messages</span>
                    <ul className="messages">
                        {messages && messages.map(item => {
                            console.log(item);
                            if (item.reciever === auth.email) {
                                return (
                                    <li key={item.id}>
                                        <span className="deep-purple-text">
                                            {item.author} 
                                        </span>
                                        <br/>
                                        <span>
                                            {item.content}
                                        </span>
                                        <div className="grey-text note-date">
                                            {moment(item.time.toDate()).fromNow()}
                                        </div>
                                    </li>
                                )
                            }
                            else{
                                return null;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Messages;