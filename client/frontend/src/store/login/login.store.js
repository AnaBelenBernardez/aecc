import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

const storeLogin = (set, get) => ({
  token: "",
  setToken: (token) => set({ token }),
});

export const useLoginStore = create(persist(storeLogin, { name: "login" }));
