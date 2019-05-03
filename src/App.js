import React from 'react';
import './App.css';
import { Button } from 'antd';

function App() {
  const perro = () => {
    console.log('you just clicked me perro');
  }
  return (
    <div className="App">
      <Button type="primary" onClick={perro}>PERRO</Button>
    </div>
  );
}

export default App;
