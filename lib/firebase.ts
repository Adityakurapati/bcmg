import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: any;
let database: any;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { database, app };

export const getVotersBySerialNo = async (serialNo: string) => {
  try {
    const votersRef = ref(database, `voters/${serialNo}`);
    const snapshot = await get(votersRef);

    if (snapshot.exists()) {
      return {
        sr_no: serialNo,
        ...snapshot.val()
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching voter:", error);
    return null;
  }
};

export const searchVotersByName = async (name: string) => {
  try {
    const indexRef = ref(database, "indexes");
    const snapshot = await get(indexRef);

    if (!snapshot.exists()) {
      return [];
    }

    const indexes = snapshot.val();
    const matchingSerialNos: string[] = [];

    for (const [indexName, serialNos] of Object.entries(indexes)) {
      if (
        indexName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(indexName.toLowerCase())
      ) {
        const serials = serialNos as Record<string, boolean>;
        matchingSerialNos.push(...Object.keys(serials));
      }
    }

    const voters = [];

    for (const serialNo of matchingSerialNos) {
      const voter = await getVotersBySerialNo(serialNo);
      if (voter) {
        voters.push(voter);
      }
    }

    return voters;
  } catch (error) {
    console.error("Error searching voters by name:", error);
    return [];
  }
};
