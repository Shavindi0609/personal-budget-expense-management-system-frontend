import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Accordion from 'react-bootstrap/Accordion';
import React, {useState, useEffect} from 'react';



function App() {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

   const decrement = () => {
    setCount(count - 1);
  }

  useEffect(() => {
    console.log(`new count is: ${count}`);
 
  },[count]

  )


  return (
   <div>
    <h1>Count: {count}</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
      
   </div>
  );
}

export default App
