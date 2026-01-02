import { useState, useEffect } from 'react';

function AdvancedCounter() {
// Load saved count from localStorage
const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('savedCount');
    return saved ? JSON.parse(saved) : 0;
  });
// History array to track every count and step value to determin increment and decrement, default value is 1
const [history, setHistory] = useState([0]);
const [step, setStep] = useState(1);

//Event handler for step value to current count
const handleIncrement = () => {
    setCount(prev => prev + step);
  };

 // Decrement: subtract step value from current count
  const handleDecrement = () => {
    setCount(prev => prev - step);
  };

// Reset: set count back to 0 AND clear history back to just [0]
  const handleReset = () => {
    setCount(0);
    setHistory([0]);
  };

// Track history and save to localStorage when count changes
 useEffect(() => {
    setHistory(prev => [...prev, count]);
    localStorage.setItem('savedCount', JSON.stringify(count));
  }, [count]);

//Keyboard listeners for arrow keys

 useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') setCount(prev => prev + step);
      if (e.key === 'ArrowDown') setCount(prev => prev - step);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [step]);

// return UI

 return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Counter</h2>
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        <strong>Current Count: {count}</strong>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleDecrement} style={{ marginRight: '10px', padding: '10px 20px' }}>Decrement</button>
        <button onClick={handleIncrement} style={{ marginRight: '10px', padding: '10px 20px' }}>Increment</button>
        <button onClick={handleReset} style={{ padding: '10px 20px' }}>Reset</button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Step Value: 
          <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} style={{ marginLeft: '10px', padding: '5px', width: '80px' }} />
        </label>
      </div>
      <div style={{ color: 'green', marginBottom: '10px' }}>Changes saved.</div>
      <div>
        <h3>Count History:</h3>
        <ul>{history.map((value, index) => <li key={index}>{value}</li>)}</ul>
      </div>
      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>Use ArrowUp to increment and ArrowDown to decrement.</div>
    </div>
  );


}

export default AdvancedCounter;