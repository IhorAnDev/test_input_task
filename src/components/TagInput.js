import React, { useState } from 'react';
import { create } from 'zustand';
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'

const useStore = create((set) => ({
    tags: [],
    result: 0,
    inputValue: '',
    setInputValue: (value) => set({ inputValue: value }),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    setResult: (value) => set({ result: value }),
}));

const TagInput = () => {
    const { tags, result, inputValue, setInputValue, addTag, removeTag, setResult } = useStore();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputBlur = () => {
        const input = inputValue.trim();
        if (input) {
            if (input.startsWith('sum(') && input.endsWith(')')) {
                const expression = input.slice(4, -1);
                try {
                    const value = evaluate(expression, tags.reduce((obj, tag) => ({ ...obj, [tag]: tag.value }), {}));
                    addTag(input);
                    setInputValue('');
                    setResult(value);
                } catch (error) {
                    console.error('Math expression error:', error);
                }
            } else {
                addTag(input);
                setInputValue('');
            }
        }
    };

    return (
        <div>
            <div>
                {tags.map((tag) => (
                    <span key={tag} className="tag">
            {tag}
                        <button onClick={() => removeTag(tag)}>&times;</button>
          </span>
                ))}
            </div>
            <input
                type="text"
                placeholder="Enter tags or math expressions..."
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
            <div>Result: {result}$</div>
        </div>
    );
};

export default TagInput;
