import React, { useState, useEffect } from 'react';
import Pictures from './Pictures';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize' 

export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToAlternate, uploadImage, showSucsess, onSkiping}) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [waitForAnswer,setWaitForAnswer] = useState(true)
  const { width, height } = useWindowSize()


  useEffect(()=>{
    setGiveUp(false)
    setWaitForAnswer(true)
  }, [leg])

  function onFinishPicture() {
    setShowUploader(false)
    setUserCode("")
    onCorrectAnswer()
  }
  
  function validateAnswer() {
    if (userCode.toUpperCase() === leg.answerCode.toUpperCase())
    {
      setWaitForAnswer(false)
    }
    else {
      setGiveUp(true)
    }
  }

  function tryingAgain() {
    setWaitForAnswer(true)
    setGiveUp(false)
    setUserCode("")
  }

  if (!giveUp) {
    return (
      <div>
        { showUploader ? 
          <Pictures onFinishPicture = {onFinishPicture} uploadImage = {uploadImage}></Pictures>
        : waitForAnswer ?
        <div>
          <ol className="instractions">
            <li>פתרו את שאלה מספר <span className='question-id'>{leg.questionId}</span> בחוברת</li>
            <li>לכו לתחנה שמספרה כתשובת השאלה</li>
            <li>הכניסו את הקוד המופיע בתחנה זו</li>
          </ol>
          <form onSubmit={(e) => {e.preventDefault(); validateAnswer()}}>
            <input className="input-code" minLength="6" maxLength="6" size="6" name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
            {/* <button type="submit">שלח</button> */}

            <div>
              <button className="send-button code">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
                  </path>
                </svg>
              </button> 
            </div>


          </form>
        </div>
        : 
        
        <div>
        <p>כל הכבוד! תשובה נכונה!</p>
        <p>שלחו תמונה קבוצתית עם הקוד</p>
        <div className="camera-icon" onClick={() => setShowUploader(true)}>
          <svg
              height="512px"
              id="Layer_1"
              style={{enableBackground: "new 0 0 512 512"}}
              version="1.1"
              viewBox="0 0 512 512"
              width="512px">
            <g>
              <path d="M430.4,147h-67.5l-40.4-40.8c0,0-0.2-0.2-0.3-0.2l-0.2-0.2v0c-6-6-14.1-9.8-23.3-9.8h-84c-9.8,0-18.5,4.2-24.6,10.9l0,0.1   l-39.5,40H81.6C63,147,48,161.6,48,180.2v202.1c0,18.6,15,33.7,33.6,33.7h348.8c18.5,0,33.6-15.1,33.6-33.7V180.2   C464,161.6,448.9,147,430.4,147z M256,365.5c-50.9,0-92.4-41.6-92.4-92.6c0-51.1,41.5-92.6,92.4-92.6c51,0,92.4,41.5,92.4,92.6   C348.4,323.9,307,365.5,256,365.5z M424.1,200.5c-7.7,0-14-6.3-14-14.1s6.3-14.1,14-14.1c7.7,0,14,6.3,14,14.1   S431.8,200.5,424.1,200.5z"/><path d="M256,202.9c-38.6,0-69.8,31.3-69.8,70c0,38.6,31.2,70,69.8,70c38.5,0,69.8-31.3,69.8-70C325.8,234.2,294.5,202.9,256,202.9   z"/>
            </g>
          </svg>
        </div>
        <Confetti
          width={width}
          height={height}
        />
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