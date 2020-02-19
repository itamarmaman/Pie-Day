import React, { useState } from 'react';
import Pictures from './Pictures';

export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToOriginal, onSkiping, uploadImage, showSucsess}) {
  const [userCode, setUserCode] = useState(leg.answerCode);
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  function onFinishPicture() {
    setShowUploader(false)
    onMovingToOriginal()
    setUserCode(leg.answerCode)
    onCorrectAnswer()
  }
  
  function validateAnswer() {
    if (userCode === leg.answerCode)
    {
      showSucsess()
      setShowUploader(true)
     
    }
    else {
      setGiveUp(true)
    }
  }
  function tryingAgain() {
    setGiveUp(false)
    setUserCode("")
  }

  if (!giveUp) {
    return (
      <div>
        <h3>Answer Question Number {leg.questionId}</h3>
        <p>Enter the code from the station (dont forget to take a pic)</p>
        <input type="number"  pattern="\d*" name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
        <button onClick = {() => validateAnswer()}>אישור</button>
        { showUploader ? 
          <Pictures onFinishPicture = {onFinishPicture} uploadImage = {uploadImage}></Pictures>
        : null }
      </div>
  );
    }
  return (
    <div>
      <h3>You are wrong</h3>
      <br></br>
      <button onClick = {() => tryingAgain()}>Try Again</button>
      <button onClick = {() => onSkiping()}>Skip question</button>
      <h3>Remember: Skiping question is allways worse than answering on the original one and even on the alertnate one</h3>
    </div>
    )
}