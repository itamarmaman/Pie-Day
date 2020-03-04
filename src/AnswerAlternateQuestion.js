import React, { useState } from 'react';
import Pictures from './Pictures';

export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToOriginal, onSkiping, uploadImage, showSucsess}) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  function onFinishPicture() {
    setShowUploader(false)
    onMovingToOriginal()
    setUserCode("")
    onCorrectAnswer()
  }
  
  function validateAnswer() {
    if (userCode.toUpperCase() === leg.alternateAnswerCode.toUpperCase())
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
        <ol className="instractions">
          <li>פתרו את שאלה מספר <span>{leg.alternateQuestionId}</span> בחוברת</li>
          <li>לכו לתחנה שמספרה בתשובת השאלה</li>
          <li>הכניסו את הקוד המופיע בתחנה זו</li>
        </ol>
        <form onSubmit={(e) => {e.preventDefault(); validateAnswer()}}>
          קוד: 
          <input name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
          <button type="submit">שלח</button>
        </form>
        { showUploader ? 
          <Pictures onFinishPicture = {onFinishPicture} uploadImage = {uploadImage}></Pictures>
        : null }
      </div>
  );
    }
  return (
    <div>
      <h3>קוד שגוי</h3>
      <button onClick = {() => tryingAgain()}>נסו שנית</button>
      <button onClick = {() => {onSkiping()}}>דלגו לשאלה הבאה</button>
      <h3>חשוב לזכור: דילוג על שאלה לא מזכה בניקוד </h3>
    </div>
    )
}