// next.config.js
require('dotenv').config(); // setup to use API keys from .env on frontend

const configs = {
    target: 'serverless',
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        REACT_APP_FIREBASE_KEY: process.env.REACT_APP_FIREBASE_KEY,
        REACT_APP_FIREBASE_DOMAIN: process.env.REACT_APP_FIREBASE_DOMAIN,
        REACT_APP_FIREBASE_DATABASE: process.env.REACT_APP_FIREBASE_DATABASE,
        REACT_APP_FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        REACT_APP_FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        REACT_APP_FIREBASE_SENDER_ID: process.env.REACT_APP_FIREBASE_SENDER_ID,
        REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID
    },
}
module.exports = configs
