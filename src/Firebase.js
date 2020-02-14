import app from 'firebase/app';
require('firebase/firestore');
require('firebase/storage');


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
    this.storage = app.storage();
  }

  events() {
    return this.db.collection("events")
  }

  TIMESTAMP() {
    return app.firestore.FieldValue.serverTimestamp();
  }

  getFileExt(file) {
    const fileType = file.name.substring(file.name.lastIndexOf('.'))
    return fileType
  }

  uploadImageForGroup(groupNum, legIndex, file) {
    var storageRef = this.storage.ref();
    const ext = this.getFileExt(file);
    var fileRef = storageRef.child("group_"+groupNum+"/"+legIndex+"/image"+ext)
    return fileRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    }).catch((e)=>{console.log("got error uploaing file for geoupNum "+groupNum, e)})
  }

  getLatestEventForGroup(groupNum) {
      console.log("in getLatestEventForGroup ", groupNum)
    return this.db.collection("events").where('groupNum', '==', "" + groupNum).orderBy("legIndex", 'desc').limit(1).get()
    .then(function (querySnapshot) {
        console.log( "got replay back "+querySnapshot.size);
        if (querySnapshot.size === 0) {
         return null;
        }    
      return querySnapshot;

      }).catch((e) => {console.log("eror in getLatestEventForGroup", e)})
  }
}


export default Firebase;