import { account } from "./AppWriteAccount";

export const getUser = async () => {
    return await account.get();
};
