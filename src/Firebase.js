import app from 'firebase/app';
require('firebase/firestore');


var firebaseConfig = {
    apiKey: "AIzaSyCWxLs3JddONlH7i2sDuS8snXAYj5idgsc",
    authDomain: "pie-day-91621.firebaseapp.com",
    databaseURL: "https://pie-day-91621.firebaseio.com",
    projectId: "pie-day-91621",
    storageBucket: "pie-day-91621.appspot.com",
    messagingSenderId: "315194400949",
    appId: "1:315194400949:web:3a7013eeb1884d43a11efc"
  };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
  }

  events() {
    return this.db.collection("events")
  }

  TIMESTAMP() {
    return app.firestore.FieldValue.serverTimestamp();
  }
}

export default Firebase;