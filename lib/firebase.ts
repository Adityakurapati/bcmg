import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCY3q8rEMOQvGgw-yVtHb57szQkA-O8kKk",
  authDomain: "bcmg-587f5.firebaseapp.com",
  databaseURL: "https://bcmg-587f5-default-rtdb.firebaseio.com",
  projectId: "bcmg-587f5",
  storageBucket: "bcmg-587f5.firebasestorage.app",
  messagingSenderId: "15928842083",
  appId: "1:15928842083:web:25cc388ba46b526c69a556",
  measurementId: "G-75C0LSED44"
};

let app: any;
let database: any;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { database, app };

export const getVotersBySerialNo = async (serialNo: string) => {
  try {
    const votersRef = ref(database, `voters/${serialNo}`);
    const snapshot = await get(votersRef);
    
    if (snapshot.exists()) {
      return {
        sr_no: serialNo,
        ...snapshot.val(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching voter:', error);
    return null;
  }
};

export const searchVotersByName = async (name: string) => {
  try {
    const indexRef = ref(database, 'indexes');
    const snapshot = await get(indexRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const indexes = snapshot.val();
    const matchingSerialNos: string[] = [];

    // Search for matching names in indexes
    for (const [indexName, serialNos] of Object.entries(indexes)) {
      if (
        indexName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(indexName.toLowerCase())
      ) {
        const serials = serialNos as Record<string, boolean>;
        matchingSerialNos.push(...Object.keys(serials));
      }
    }

    // Fetch voter details for matching serial numbers
    const voters = [];
    for (const serialNo of matchingSerialNos) {
      const voter = await getVotersBySerialNo(serialNo);
      if (voter) {
        voters.push(voter);
      }
    }

    return voters;
  } catch (error) {
    console.error('Error searching voters by name:', error);
    return [];
  }
};
