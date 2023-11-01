import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {create} from 'zustand';
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import TagInput from "./components/TagInput";
import Result from "./components/Result";
import * as PropTypes from "prop-types";

const fetchAutocomplete = async () => {
    const response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

const useTagStore = create((set) => ({
    tags: {},
    addTag: (tag) => set((state) => ({tags: {...state.tags, [tag]: 0}})),
    deleteTag: (tag) => set((state) => {
        const newTags = {...state.tags};
        delete newTags[tag];
        return {tags: newTags};
    }),
    editTag: (tag, value) => set((state) => ({tags: {...state.tags, [tag]: value}})),
    result: '0.00 ',
    setResult: (result) => set(() => ({result})),
}));

function TagList(props) {
    return null;
}

TagList.propTypes = {
    onTagDelete: PropTypes.func,
    onTagEdit: PropTypes.func,
    tags: PropTypes.shape({})
};
const App = () => {
    const {tags, addTag, deleteTag, editTag, result, setResult} = useTagStore();
    const {data: autocompleteData} = useQuery('autocomplete', fetchAutocomplete);
    const [inputValue, setInputValue] = useState('');

    const handleTagClick = (tag) => {
        addTag(tag);
    };

    const handleInputBlur = () => {
        // Разбираем введенные теги и операции
        const parts = inputValue.split(' ');
        let calculatedResult = 0;
        let currentOperator = '+';

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (part in tags) {
                // Если это тег, добавляем его значение к результату
                calculatedResult = evaluate(`${calculatedResult} ${currentOperator} ${tags[part]}`);
            } else if (['+', '-', '*', '/', '^'].includes(part)) {
                // Если это операция, обновляем текущего оператора
                currentOperator = part;
            }
        }

        setResult(`${calculatedResult.toFixed(2)} $`);
    };

    return (
        <div>
            <h1>Math Tag Calculator</h1>
            <TagInput onAddTag={handleTagClick} inputValue={inputValue} setInputValue={setInputValue}/>
            <Result result={result}/>
            <div>
                {autocompleteData &&
                    autocompleteData.slice(0, 7).map((tag) => (
                        <button key={tag.id} onClick={() => handleTagClick(tag.name)}>
                            {tag.name}
                        </button>
                    ))}
            </div>
            <TagList tags={tags} onTagDelete={deleteTag} onTagEdit={editTag}/>
        </div>
    );
};

export default App;
