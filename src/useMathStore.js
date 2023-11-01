// useMathStore.js
import create from 'zustand';

const useMathStore = create((set) => ({
    inputValue: '',
    suggestions: [],
    result: null,
    setInputValue: (inputValue) => set({ inputValue }),
    setSuggestions: (suggestions) => set({ suggestions }),
    setResult: (result) => set({ result }),
}));

export default useMathStore;
