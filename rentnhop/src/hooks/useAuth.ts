import { appState } from "../store";

export const useAuth = () => {
  const user = appState((state: any) => state.user);
  const isAuthenticated = !!user;
  return { user, isAuthenticated };
};
