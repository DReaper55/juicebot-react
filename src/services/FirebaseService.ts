import {initializeApp} from "firebase/app";
// import { Auth, getAuth } from 'firebase/auth';
// import { Firestore, getFirestore } from 'firebase/firestore';
import { Database, getDatabase } from 'firebase/database';
import config from "../types/config";


const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    appId: config.firebaseAppId,
    databaseURL: config.firebaseDBUrl,
};

class FirebaseService {
    private static instance: FirebaseService;
    // public auth?: Auth;
    // public firestore?: Firestore;
    public database?: Database;

    private constructor() {
        if (!FirebaseService.instance) {
            const app = initializeApp(firebaseConfig);

            // Initialize services
            // this.auth = getAuth(app);
            // this.firestore = getFirestore(app);
            this.database = getDatabase(app);

            // Store the instance so it can be reused
            FirebaseService.instance = this;
        }

        return FirebaseService.instance;
    }

    public static getInstance(): FirebaseService {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }
}

export default FirebaseService;
