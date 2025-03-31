import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

const config = {
  projectId: "676d18ae001da3afaa78",
  platform: "com.jsm.aora",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "676d4b780026421239c3",
  userCollectionId: "676d4ba200256c640870",
  videoCollectionId: "676d4bd500274313922b",
  storageId: "676d4d73000fc87e0db9",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAcct = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAcct) throw Error;

    const avatarUrl = avatars.getInitials(username);

    signInUser(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAcct.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();

    if (!currentUser) throw Error;

    const user = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentUser.$id)]
    );

    if (!user) throw Error;

    return user.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
