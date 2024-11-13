import admin from "firebase-admin";

import serviceAccount from '../assets/firebase-adminsdk.json' assert {type: 'json'};

class FirebaseService {
    constructor() {
        if (!FirebaseService.instance) {
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
            });
      
            this.auth = admin.auth();
            this.firestore = admin.firestore();
    
            // Store the instance so it can be reused
            FirebaseService.instance = this;
          }
      
          return FirebaseService.instance;
      }
}

export default FirebaseService;
