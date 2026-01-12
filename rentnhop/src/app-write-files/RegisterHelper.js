import { account } from "./AppWriteAccount";
import { databases,databaseId,userCartId } from "./AppWriteAccount";
import { ID } from "appwrite";

const register = async (data) => {
  const user = await account.create(
    ID.unique(),
    data.email,
    data.password,
    data.name
  );
   await databases.createRow({
    databaseId,
    tableId: userCartId,
    rowId: ID.unique(), 
    data: {
      userId: user.$id,
      CartItems: [],
    },
  });
  return user;
};

export { register };
