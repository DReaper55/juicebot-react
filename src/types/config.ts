const envVars = import.meta.env;

const config = {
    firebaseDBUrl: envVars.VITE_REACT_APP_FIREBASE_DB_URL,
};

export default config;