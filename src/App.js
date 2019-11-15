import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import AnswerOriginalQuestion from './AnswerOriginalQuestion'

export default function App() {
  const [groupNum, setGroupNum] = useState();
  const [showSuccsesNotification, setShowSuccsesNotification] = useState(false);
  const [legIndex, setLegIndex] = useState(0);
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
  function onCorrectAnswer() {
    setShowSuccsesNotification(true)
    setTimeout(() => setShowSuccsesNotification(false), 1000)
    setLegIndex(legIndex+1)
  }


  if (!groupNum) 
  return (
    
    <div className="App">
      <SelectGroup onGroupNum = {onGN} ></SelectGroup>
    </div>
  ); 
  return (
    
    <div className="App">
      <Header groupNum = {groupNum}></Header>
      {showSuccsesNotification ? <div>Congratolations! Thats the right answer</div> : null}
      <AnswerOriginalQuestion leg = {teamsArray[groupNum][legIndex]} onCorrectAnswer = {onCorrectAnswer}></AnswerOriginalQuestion>
    </div>
  );
}