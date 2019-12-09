import React, { useState, useEffect } from 'react';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'
import Win from './Win'
import OnlineStatus from './OnlineStatus'

export default function App({firebase}) {
  
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
  const [progress, setProgress] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [finished, setFinished] = useState(false);
  const [liatURL, setLiatURL] = useState(new URLSearchParams(window.location.search).has("liat"));  

  const progressArray = {
    1: [3,3,2,1,1,0,0,0,0,0],
    2: [2,2,3,3,3,1,0,0,0,0],
    3: [1,1,3,3,3,3,3,0,0,0]
  }
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
    if (x==groupNum) return;
    console.log("GN ", x)
    setGroupNum(x)
    firebase.getLatestEventForGroup(x, (event) => {
      console.log("event ", event)
      setProgress(event.progress)
      setFinished(event.finish)
      setLegIndex(Math.min(event.legIndex, teamsArray[x].length - 1))
    })
  }

  
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("team");
    console.log("in useEffect ", param)
    if (param) {
      onGN(param)
    }
  }, [groupNum]);

  function hasNextLeg() {
    return legIndex < teamsArray[groupNum].length - 1;
  }

  function moveToNextLeg() {

      firebase.events().add({
        groupNum: groupNum,
        legIndex: Math.min(legIndex+1, teamsArray[groupNum].length - 1), 
        progress: progress,
        finish: !hasNextLeg(),
        creationTime: firebase.TIMESTAMP() })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    if (!hasNextLeg)
    {
      setFinished(true)
      return
    } 
    setLegIndex(legIndex+1)

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
    console.log("skiping")
    progress[legIndex] = 1
    setProgress(progress)
    moveToNextLeg()
  }

  if (liatURL) {
     return <OnlineStatus progressArray = {progressArray}></OnlineStatus>
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