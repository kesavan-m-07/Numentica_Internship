import { SelectedSortingValueState } from "../types";

export const sortSelected = (set: (fn: (state: SelectedSortingValueState) => Partial<SelectedSortingValueState>) => void): SelectedSortingValueState => ({
  selectedSort: "hotseller",
  setSelectedSort: (value: string) => set(() => ({ selectedSort: value })),
});
