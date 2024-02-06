import { createJSONStorage } from "zustand/middleware";

const storageToken = {
  getItem: function (name) {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name, value) {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name) {
    sessionStorage.removeItem(name);
  },
};

export const customSessionStorage = createJSONStorage(() => storageToken);
