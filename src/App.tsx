import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Accordion from 'react-bootstrap/Accordion';

function buttonClick() {
  console.log("Button is clicked")
  alert("Button is clicked");
}

function App() {

  return (
   <div>
      <h1>React Event Handling</h1>
      <br></br><hr></hr>
      <button onClick={buttonClick}>Click Here</button>
   </div>
  );
}

export default App
