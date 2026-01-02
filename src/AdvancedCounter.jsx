import { useState, useEffect } from 'react';

function AdvancedCounter() {
// Load saved count from localStorage
const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('savedCount');
    return saved ? JSON.parse(saved) : 0;
  });
// History array to track every count and step value to determin incremenet and decremenet
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
}