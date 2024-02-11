import { atom, selector } from "recoil";

export const daysState = atom({
  key: "daysState",
  default: [],
});

export const daysSelector = selector({
  key: "daysStateSelector",
  get: ({ get }) => {
    const text = get(daysState);
    return text;
  },
});

export const codegenState = atom({
  key: "codegen",
  default: "",
});

export const codegenSelector = selector({
  key: "codegenSelector",
  get: ({ get }) => {
    const text = get(codegenState);
    return text;
  },
});
