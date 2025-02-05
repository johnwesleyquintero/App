import React from 'react';
import Button from './components/Button';
import './App.css';

function App() {
  const handleClick = () => {
    console.error('Button clicked!');
    // Example of throwing an error
    throw new Error("Button click error");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleClick}>Click me</Button>
      </header>
    </div>
  );
}

export default App;