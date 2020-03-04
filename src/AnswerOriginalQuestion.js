import React, { useState, useEffect } from 'react';
import Pictures from './Pictures';

export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToAlternate, uploadImage, showSucsess, onSkiping}) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(()=>{
    setGiveUp(false)
  }, [leg])

  function onFinishPicture() {
    setShowUploader(false)
    setUserCode("")
    onCorrectAnswer()
  }
  
  function validateAnswer() {
    if (userCode.toUpperCase() === leg.answerCode.toUpperCase())
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
        { showUploader ? 
          <Pictures onFinishPicture = {onFinishPicture} uploadImage = {uploadImage}></Pictures>
        :  
        <div>
          <ol className="instractions">
            <li>פתרו את שאלה מספר <span>{leg.questionId}</span> בחוברת</li>
            <li>לכו לתחנה שמספרה בתשובת השאלה</li>
            <li>הכניסו את הקוד המופיע בתחנה זו</li>
          </ol>
          <form onSubmit={(e) => {e.preventDefault(); validateAnswer()}}>
            קוד: 
            <input name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
            <button type="submit">שלח</button>
          </form>
        </div>
        }
      </div>
  );
    }
  return (
    <div>
      <h3>קוד שגוי</h3>
      <button onClick = {() => tryingAgain()}>נסו שנית</button>
      {leg.alternateQuestionId !== 0 ? 
        <div>
          <button onClick = {() => {onMovingToAlternate()}}>החלפו שאלה</button>
          <h3>חשוב לזכור: שאלה חלופית מזכה בניקוד נמוך יותר משאלה מקורית</h3>
        </div>
      : 
      <div>
        <button onClick = {() => {onSkiping()}}>דלגו לשאלה הבאה</button>
        <h3>חשוב לזכור: דילוג על שאלה לא מזכה בניקוד </h3>
      </div>
      }
    </div>
  )
}