import firebase from "@firebase/app";
import "@firebase/storage";
import "@firebase/auth";

class Firebase extends React.Component {
    constructor(props) {
        super(props)

        this.config = {
            apiKey: process.env.REACT_APP_FIREBASE_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID
        };
    }

    firebaseInstance = () => { return !firebase.apps.length ? firebase.initializeApp(this.config) : firebase.app(); };

    firebaseStorage = () => { return firebaseInstance.storage(); };
}

export default Firebase