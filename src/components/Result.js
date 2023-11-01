// Result.js
import React from 'react';
import '../App.css'; // Импортируем стили

function Result({ result }) {
    return <div className="result">Result: {result}$</div>;
}

export default Result;
