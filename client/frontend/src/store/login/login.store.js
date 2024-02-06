import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";

const storeLogin = (set, get) => ({
  token: "",
  id: "",
  setToken: (token) => set({ token }),
  setId: (id) => set({ id }),
});

export const useLoginStore = create(
  persist(storeLogin, { name: "login", storage: customSessionStorage })
);
