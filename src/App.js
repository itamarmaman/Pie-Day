import React, { useState, useEffect } from 'react';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'
import Win from './Win'
import OnlineStatus from './OnlineStatus'
import { fromNumber } from 'long';

export default function App({ firebase }) {

  var firebaseConfig = {
    apiKey: "AIzaSyCWxLs3JddONlH7i2sDuS8snXAYj5idgsc",
    authDomain: "pie-day-91621.firebaseapp.com",
    databaseURL: "https://pie-day-91621.firebaseio.com",
    projectId: "pie-day-91621",
    storageBucket: "pie-day-91621.appspot.com",
    messagingSenderId: "315194400949",
    appId: "1:315194400949:web:3a7013eeb1884d43a11efc"

  };

  
  const [groupNum, setGroupNum] = useState(null);
  const [showSuccsesNotification, setShowSuccsesNotification] = useState(false);
  const [legIndex, setLegIndex] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [finished, setFinished] = useState(false);
  const [liatURL, setLiatURL] = useState(new URLSearchParams(window.location.search).has("liat"));

  const progressArray = {
    1: [3, 3, 2, 1, 1, 0, 0, 0, 0, 0],
    2: [2, 2, 3, 3, 3, 1, 0, 0, 0, 0],
    3: [1, 1, 3, 3, 3, 3, 3, 0, 0, 0]
  }
  const teamsArray = {
    1: [
      {
        questionId: 67,
        alternateQuestionId: 167,
        answerCode: "1"
      },
      {
        questionId: 34,
        alternateQuestionId: 134,
        answerCode: "2"
      },
      {
        questionId: 19,
        alternateQuestionId: 119,
        answerCode: "3"
      },

    ],
    2: [
      {
        questionId: 67,
        alternateQuestionId: 167,
        answerCode: "1"
      },
      {
        questionId: 34,
        alternateQuestionId: 134,
        answerCode: "2"
      },
      {
        questionId: 19,
        alternateQuestionId: 119,
        answerCode: "3"
      },

    ]
  }

  async function onGN(x) {
    if (x == groupNum) return;
    console.log("GN ", x)
    setGroupNum(x)


    const querySnapShot = await firebase.getLatestEventForGroup(x)
    
    if (querySnapShot == null) {
      console.log("sending init event for group ", x)
      firebase.events().add({
        groupNum: x,
        legIndex: 0,
        progress: progress,
        finish: false,
        creationTime: firebase.TIMESTAMP()
      })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

    } else {

      const event = querySnapShot.docs[0].data()

      console.log("event ", event)
      setProgress(event.progress)
      setFinished(event.finish)
      setLegIndex(event.legIndex)
    }
  }


  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("team");
    console.log("in useEffect ", param)
    if (param) {
      onGN(param)
    }
  }, []);

  function hasNextLeg() {
    return legIndex < teamsArray[groupNum].length - 1;
  }

  function moveToNextLeg() {

    firebase.events().add({
      groupNum: groupNum,
      legIndex: legIndex + 1,
      progress: progress,
      finish: !hasNextLeg(),
      creationTime: firebase.TIMESTAMP()
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    if (!hasNextLeg()) {
      setFinished(true)
      return
    }
    setLegIndex(legIndex + 1)

  }

  function showSucsess () {
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 2000)
  }
  function onOrginalCorrectAnswer() {
    progress[legIndex] = 3
    setProgress(progress)
    moveToNextLeg()
  }
  function onAlternateCorrectAnswer() {
    progress[legIndex] = 2
    setProgress(progress)
    moveToNextLeg()
  }
  function onSkipingQuestion() {
    console.log("skiping")
    progress[legIndex] = 1
    setProgress(progress)
    moveToNextLeg()
  }

  function uploadImage(picture) {
    firebase.uploadImageForGroup(groupNum,legIndex,picture)
  }

  if (liatURL) {
    return <OnlineStatus teamsArray = {teamsArray} firebase = {firebase} liatURL = {liatURL}></OnlineStatus>
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
        <QuestionForm 
          leg = {teamsArray[groupNum][legIndex]}
          onOrginalCorrectAnswer = {onOrginalCorrectAnswer}
          onAlternateCorrectAnswer = {onAlternateCorrectAnswer}
          onSkipingQuestion = {onSkipingQuestion}
          uploadImage = {uploadImage}
          showSucsess = {showSucsess}
          > 
          </QuestionForm>
        : <Win></Win>}
    </div>
  )
}