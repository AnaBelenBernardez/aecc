import { create } from "zustand";

export const useModalEventStore = create((set) => ({
  isModalEventOpen: false,
  isModalDeleteEventOpen: false,
  isModalEditEventOpen: false,
  isModalAchievementsOpen: false,
  isModalDeleteAchievementsOpen: false,
  isModalEditAchievementsOpen: false,
  idDeleteEvent: "",

  openModalEvent: () => set({ isModalEventOpen: true }),
  closeModalEvent: () => set({ isModalEventOpen: false }),
  openModalDeleteEvent: () => set({ isModalDeleteEventOpen: true }),
  closeModalDeleteEvent: () => set({ isModalDeleteEventOpen: false }),
  openModalEditEvent: () => set({ isModalEditEventOpen: true }),
  closeModalEditEvent: () => set({ isModalEditEventOpen: false }),
  openModalAchievements: () => set({ isModalAchievementsOpen: true }),
  closeModalAchievements: () => set({ isModalAchievementsOpen: false }),
  openModalDeleteAchievements: () =>
    set({ isModalDeleteAchievementsOpen: true }),
  closeModalDeleteAchievements: () =>
    set({ isModalDeleteAchievementsOpen: false }),
  openModalEditAchievements: () => set({ isModalEditAchievementsOpen: true }),
  closeModalEditAchievements: () => set({ isModalEditAchievementsOpen: false }),
  setIdDeleteEvent: (id) => set({ idDeleteEvent: id }),
}));
