import React from 'react'
import TopicBox from '../components/TopicBox'
import Content from '../components/Content'

export default function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <TopicBox food="Kottu" price="Rs 250.00"/>
        <TopicBox food="rice"  price="Rs 350.00"/>
        <TopicBox food="Hoppers"  price="Rs 150.00"/>
        <Content/>
    </div>
  )
}
