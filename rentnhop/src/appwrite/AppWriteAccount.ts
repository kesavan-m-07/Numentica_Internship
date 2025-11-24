import { Client, Account, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("69009a3e003790c2a8f1");

export const account = new Account(client);
export const databases = new TablesDB(client);

export const citybikeInfo = "city-bike-info";
export const cityInfo = "city-info";
export const bikeInfo = "bike-info";
export const databaseId = '6900df0100099df691c7'
export const userCartId = 'user-cart';
