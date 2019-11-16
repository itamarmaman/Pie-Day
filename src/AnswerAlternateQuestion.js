import React, { useState } from 'react';

export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToOriginal, onSkiping}) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false)
  function validateAnswer() {
    if (userCode === leg.answerCode)
    {
      onCorrectAnswer()
      setUserCode("")
      onMovingToOriginal()
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
        <h3>Answer Question Number {leg.alternateQuestionId}</h3>
        <p>Enter the code from the station (dont forget to take a pic)</p>
        <input type = "text" name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
        <button onClick = {() => validateAnswer()}>אישור</button>
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