import React, { useState } from 'react';
import Pictures from './Pictures';
import CorrectAnswer from './CorrectAnswer';


export default function AnswerOriginalQuestion({ leg, onCorrectAnswer, onMovingToOriginal, onSkiping, uploadImage, showSucsess }) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [waitForAnswer, setWaitForAnswer] = useState(true)

  function onFinishPicture() {
    setShowUploader(false)
    onMovingToOriginal()
    setUserCode("")
    onCorrectAnswer()
  }

  function validateAnswer() {
    if (userCode.toUpperCase() === leg.alternateAnswerCode.toUpperCase()) {
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
        {showUploader ?
          <Pictures onFinishPicture={onFinishPicture} uploadImage={uploadImage} />
          : waitForAnswer ?
            <div>
              <ol className="instractions">
                <li>פתרו את שאלה מספר <span className='question-id'>{leg.alternateQuestionId}</span> בחוברת</li>
                <li>לכו לתחנה שמספרה כתשובת השאלה</li>
                <li>הכניסו את הקוד המופיע בתחנה זו</li>
              </ol>
              <form onSubmit={(e) => { e.preventDefault(); validateAnswer() }}>
                <input className="input-code" minLength="6" maxLength="6" size="6" name="" value={userCode} onChange={(e) => setUserCode(e.target.value)} />
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
            <CorrectAnswer onOpenCamera={() => { setShowUploader(true) }} />
            }
      </div>);
  }
  return (
    <div>
      <h3>קוד שגוי</h3>
      <button onClick={() => tryingAgain()}>נסו שנית</button>
      <button onClick={() => { onSkiping() }}>דלגו לשאלה הבאה</button>
      <h3>חשוב לזכור: דילוג על שאלה לא מזכה בניקוד </h3>
    </div>
  )
}