import { account } from "./AppWriteAccount";
import { databases,databaseId,userCartId } from "./AppWriteAccount";
import { ID } from "appwrite";

const register = async (data: any) => {
  const user = await account.create(
    ID.unique(),
    data.email,
    data.password,
    data.name
  );
   await databases.createRow(
    databaseId,
    userCartId,
    ID.unique(), 
    {
      userId: user.$id,
      CartItems: [],
    }
  );
  return user;
};

export { register };
