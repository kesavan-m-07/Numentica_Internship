import { DayDifferenceState } from "../types";

const dayDifference = (set: (fn: (state: DayDifferenceState) => Partial<DayDifferenceState>) => void): DayDifferenceState => ({
  difference: { day: 1, hours: 0 },
  updateDiffrence: (difference: { day: number; hours: number }) => set(() => ({ difference })),
});

export default dayDifference;
