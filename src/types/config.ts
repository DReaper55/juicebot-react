const envVars = import.meta.env;

const config = {
    firebaseDBUrl: envVars.VITE_REACT_APP_FIREBASE_DB_URL,
    firebaseApiKey: envVars.VITE_REACT_APP_FIREBASE_API_KEY,
    firebaseAuthDomain: envVars.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: envVars.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    firebaseAppId: envVars.VITE_REACT_APP_FIREBASE_APP_ID,
    firebaseStorageBucket: envVars.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
};

export default config;