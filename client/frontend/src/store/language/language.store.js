import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

const storeLanguage = (set, get) => ({
  language: "es", 
  setLanguage: (language) => set({ language })
});


export const useLanguageStore = create(
  persist(
    storeLanguage,
    { name: "language" }
  )
);