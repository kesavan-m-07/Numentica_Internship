import { account } from "./AppWriteAccount";
export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
