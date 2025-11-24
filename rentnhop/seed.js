// import { Client, Databases, Query, TablesDB } from "node-appwrite";

// const seed =  async() => {
//   const client = new Client()
//     .setEndpoint("https://nyc.cloud.appwrite.io/v1")
//     .setProject("69009a3e003790c2a8f1")
//     .setKey(
//       "standard_30a5f6f627133db6375740f42a03ae3e7f2af6dee9a1eff2dced5950358ebfe1bba56432e7334c7e974f00e8ebf579195c260502809d3e0daf0ea57a327307c220ac43efeeddc970ef551a2ba5693bbee12a012b04ebadb27bbdce3d5665bce9e4652ffbd59e658a6f0313b9785e17f37e7876bcce86f86ab2bc0074f964cdce"
//     );

//   //  const account = new Account(client);
//   const databases = new TablesDB(client);

//   const citybikeInfo = "city-bike-info";
//   const databaseId = "6900df0100099df691c7";

//   // Get all bikes
//   const bikes = await databases.listRows(databaseId, citybikeInfo, [
//     Query.notEqual("status", "available"),
//   ]);
//   console.log(bikes.length);

//   for (const bike of bikes.documents) {
//     await databases.updateDocument(databaseId, citybikeInfo, bike.$id, {
//       status: "available",
//     });
//   }

//   return res.json({
//     message: `Updated ${bikes.documents.length} bikes`,
//   });
// };

// seed()

// resetBikes.js
import { Client, Databases, Query } from "node-appwrite";

const resetBikes = async () => {
  try {
    const client = new Client()
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("69009a3e003790c2a8f1")
      .setKey(
        "standard_30a5f6f627133db6375740f42a03ae3e7f2af6dee9a1eff2dced5950358ebfe1bba56432e7334c7e974f00e8ebf579195c260502809d3e0daf0ea57a327307c220ac43efeeddc970ef551a2ba5693bbee12a012b04ebadb27bbdce3d5665bce9e4652ffbd59e658a6f0313b9785e17f37e7876bcce86f86ab2bc0074f964cdce"
      );

    const databases = new Databases(client);

    const databaseId = "6900df0100099df691c7";
    const citybikeInfo = "city-bike-info";

    console.log("Fetching bikes that are NOT 'available'...");

    const bikes = await databases.listDocuments(databaseId, citybikeInfo, [
      Query.notEqual("status", "available"),
      Query.limit(100),
    ]);

    console.log(`Found ${bikes.documents.length} bikes to update.`);

    for (const bike of bikes.documents) {
      await databases.updateDocument(databaseId, citybikeInfo, bike.$id, {
        status: "available",
      });
    }

    console.log(`✔ Successfully updated ${bikes.documents.length} bikes.`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

resetBikes();
