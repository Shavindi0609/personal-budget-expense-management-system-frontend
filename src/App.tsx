import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import First from './components/First'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>This is my first react project</h1>
      <First/>
    </div>
  
  )
}

export default App
