import admin from "firebase-admin";
import serviceAccount from '../assets/firebase-adminsdk.json' assert {type: 'json'};
import config from "../types/config";

class FirebaseService {
    private static instance: FirebaseService;
    public auth?: admin.auth.Auth;
    public firestore?: admin.firestore.Firestore;
    public database?: admin.database.Database;

    private constructor() {
        if (!FirebaseService.instance) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
                databaseURL: config.firebaseDBUrl,
            });

            this.auth = admin.auth();
            this.firestore = admin.firestore();
            this.database = admin.database();

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
