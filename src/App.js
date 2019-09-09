import React from 'react';
import logo from './logo.svg';
import './App.css';
import Line from './components/Line';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Line x1={2} x2={180} y1={360} y2={520}></Line>
      </header>
    </div>
  );
}

export default App;
