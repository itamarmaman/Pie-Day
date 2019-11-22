import React, { useState } from 'react';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'
import Win from './Win'

export default function App() {
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