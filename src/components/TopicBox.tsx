import React from 'react'
import './topicbox.css'

export default function TopicBox(props) {

//   const topic = "My name is Shavindi"
//   const item = "Ridmamli Aloka"

//   const a = 10;
//   const b = 20;
//   const c = a+b;

  
  return (
    <div>
        <div className="topicBox">
            <span className="text">My favourit food is {props.food} the price is {props.price}</span>
            {props.children}
        </div>
    </div>
  )
}
