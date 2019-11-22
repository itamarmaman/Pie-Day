import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'

export default function App() {
  const [groupNum, setGroupNum] = useState(new URLSearchParams(window.location.search).get("team"));
  const [showSuccsesNotification, setShowSuccsesNotification] = useState(false);
  const [legIndex, setLegIndex] = useState(0);
  const [progress, setProgress] = useState([0,0,0,0,0,0,0,0,0,0]);
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
  const onGN = (x) => setGroupNum(x)
  
  function onOrginalCorrectAnswer() {
    setProgress(progress[legIndex] = 3)
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 2000)
    setLegIndex(legIndex+1)
  }
  function onAlternateCorrectAnswer() {
    setProgress(progress[legIndex] = 2)
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 2000)
    setLegIndex(legIndex+1)
  }
  function onSkipingQuestion() {
    setProgress(progress[legIndex] = 1)
    setLegIndex(legIndex+1)
  }
  

  if (!groupNum) {
    return (
      <div className="App">
        <SelectGroup onGroupNum = {onGN} ></SelectGroup>
      </div>
  );
  }
  return ( 
    <div className="App">
      <Header groupNum = {groupNum} progress = {progress}></Header>
      {showSuccsesNotification ? <div>Congratolations! Thats the right answer</div> : null}
      <QuestionForm leg = {teamsArray[groupNum][legIndex]} onOrginalCorrectAnswer = {onOrginalCorrectAnswer} onAlternateCorrectAnswer = {onAlternateCorrectAnswer} onSkipingQuestion = {onSkipingQuestion}></QuestionForm>
    </div>
  )

}