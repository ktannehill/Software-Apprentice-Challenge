import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ads, setAds] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch("http://localhost:3000/fakeDataSet")
    .then(resp => resp.json())
    .then(setAds)
  }

  console.log(ads)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
