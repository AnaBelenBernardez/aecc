import { create } from "zustand";

export const useEventsStore = create((set, get) => ({
  events: [],
  updateEvents: (events) => set({ events }),
}));
