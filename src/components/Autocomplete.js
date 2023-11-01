// Autocomplete.js
import React from 'react';
import '../App.css';

function Autocomplete({ suggestions, onSelect }) {
    return (
        <ul className="autocomplete">
            {suggestions.map((suggestion) => (
                <li key={suggestion.id} onClick={() => onSelect(suggestion.name)}>
                    {suggestion.name}
                </li>
            ))}
        </ul>
    );
}

export default Autocomplete;
