import { UserInfoState } from "../types";

export const userInfo = (set: (fn: (state: UserInfoState) => Partial<UserInfoState>) => void): UserInfoState => ({
  user: null,
  setUser: (name: string, email: string, id: string) =>
    set(() => {
      return {
        user: { username: name, userEmail: email, $id: id },
      };
    }),
  removeUser: () =>
    set(() => ({
      user: null,
    })),
});
