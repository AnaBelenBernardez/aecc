import { create } from "zustand";

export const useModalEventStore = create((set) => ({
  isModalEventOpen: false,
  isModalDeleteEventOpen: false,
  isModalEditEventOpen: false,
  idDeleteEvent: "",

  openModalEvent: () => set({ isModalEventOpen: true }),
  closeModalEvent: () => set({ isModalEventOpen: false }),
  openModalDeleteEvent: () => set({ isModalDeleteEventOpen: true }),
  closeModalDeleteEvent: () => set({ isModalDeleteEventOpen: false }),
  openModalEditEvent: () => set({ isModalEditEventOpen: true }),
  closeModalEditEvent: () => set({ isModalEditEventOpen: false }),
  setIdDeleteEvent: (id) => set({ idDeleteEvent: id }),
}));
