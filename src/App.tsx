import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'



function App() {

  const [count, setCount] = useState(0);
  
  // let count = 0;

  const increment = () =>{
    // count +=1;
    setCount(count+1);
  };

  const decrement = () =>{
    // count -+1;
    setCount(count-1);
  };

  return (
    <>
    <span className='title'>My Counter</span>
    <p className='subtitle'>The count is {count}</p>
    <button onClick={decrement} className='button'>-</button>
    <button  onClick={increment} className='button'>+</button>
    </>
  );
}

export default App
