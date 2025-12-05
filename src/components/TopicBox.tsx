import React from 'react'
import './topicbox.css'

export default function TopicBox() {

  const topic = "My name is Shavindi"
  const item = "Ridmamli Aloka"

  return (
    <div>
        <div className="topicBox">
            <span className="text">{topic} {item}</span>
        </div>
    </div>
  )
}
