import React from 'react'
import TopicBox from '../components/TopicBox'
import Content from '../components/Content'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <Link to="/About"> Go to About the pages</Link>
        <Link to="/Contact"> Go to Contact the pages</Link>

    </div>
  )
}
