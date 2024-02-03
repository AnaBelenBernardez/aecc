import {create} from 'zustand';


const localStorageKey = 'preferredLanguage';

const useLanguageStore = create((set) => {
  const storedLanguage = localStorage.getItem(localStorageKey);

  return {
    language: storedLanguage || 'es',
    setLanguage: (lang) => {
      set({ language: lang });
      
      localStorage.setItem(localStorageKey, lang);
    },
  };
});

export default useLanguageStore;