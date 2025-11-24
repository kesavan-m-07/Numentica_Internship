import { account } from "./AppWriteAccount";

const login = async (userData: any) => {
  return await account.createEmailPasswordSession(
    userData.email,
    userData.password
  );
};

export { login };
