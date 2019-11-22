import React, { useState } from 'react';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'
import Win from './Win'
const firebase = require("firebase");
require("firebase/firestore");

export default function App() {
  
  var firebaseConfig = {
    apiKey: "AIzaSyCWxLs3JddONlH7i2sDuS8snXAYj5idgsc",
    authDomain: "pie-day-91621.firebaseapp.com",
    databaseURL: "https://pie-day-91621.firebaseio.com",
    projectId: "pie-day-91621",
    storageBucket: "pie-day-91621.appspot.com",
    messagingSenderId: "315194400949",
    appId: "1:315194400949:web:3a7013eeb1884d43a11efc"
  };
  firebase.initializeApp(firebaseConfig);


  var db = firebase.firestore();

  const [groupNum, setGroupNum] = useState(new URLSearchParams(window.location.search).get("team"));
  const [showSuccsesNotification, setShowSuccsesNotification] = useState(false);
  const [legIndex, setLegIndex] = useState(0);
  const [progress, setProgress] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [finished, setFinished] = useState(false);
  const teamsArray = {
    1: [
      {
        questionId: 67,
        alternateQuestionId: 167,
        answerCode: "ABXD"  
      },
      {
        questionId: 34,
        alternateQuestionId: 134,
        answerCode: "XYSAR"  
      },
      {
        questionId: 19,
        alternateQuestionId: 119,
        answerCode: "ITAMAR_RUELLZZZ!!!!1"  
      },

    ]
  }
  
  function onGN(x) {
    setGroupNum(x)
  }

  function moveToNextLeg() {
    if (legIndex === teamsArray[groupNum].length - 1)
    {
      setFinished(true)
      return
    } 
    setLegIndex(legIndex+1)
      db.collection("events").add({
        groupNum: groupNum,
        legIndex: legIndex, 
        progress: progress })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
  }

  function onOrginalCorrectAnswer() {
    progress[legIndex] = 3
    setProgress(progress)
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 2000)
    moveToNextLeg()
  }
  function onAlternateCorrectAnswer() {
    progress[legIndex] = 2
    setProgress(progress)
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 2000)
    moveToNextLeg()
  }
  function onSkipingQuestion() {
    progress[legIndex] = 1
    setProgress(progress)
    moveToNextLeg()
  }

  if (!groupNum) {
    return (
      <div className="App">
        <SelectGroup onGroupNum = {onGN}></SelectGroup>
      </div>
  );
  }
  return ( 
    <div className="App">
      <Header groupNum = {groupNum} progress = {progress}></Header>
      {showSuccsesNotification ? <div>Congratolations! Thats the right answer</div> : null}
      {!finished ? 
        <QuestionForm leg = {teamsArray[groupNum][legIndex]} onOrginalCorrectAnswer = {onOrginalCorrectAnswer} onAlternateCorrectAnswer = {onAlternateCorrectAnswer} onSkipingQuestion = {onSkipingQuestion}></QuestionForm> 
        : <Win></Win>}
    </div>
  )
}