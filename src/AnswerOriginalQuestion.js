import React, { useState, useEffect } from 'react';
import Pictures from './Pictures';
import CorrectAnswer from './CorrectAnswer';

export default function AnswerOriginalQuestion({ leg, onCorrectAnswer, onMovingToAlternate, uploadImage, onSkiping }) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [waitForAnswer, setWaitForAnswer] = useState(true)


  useEffect(() => {
    setGiveUp(false)
    setWaitForAnswer(true)
  }, [leg])

  function onFinishPicture() {
    setShowUploader(false)
    setUserCode("")
    onCorrectAnswer()
  }

  function validateAnswer() {
    if (userCode.toUpperCase() === leg.answerCode.toUpperCase()) {
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
          <Pictures onFinishPicture={onFinishPicture} uploadImage={uploadImage}></Pictures>
          : waitForAnswer ?
            <div>
              <ol className="instractions">
                <li>פתרו את שאלה מספר <span className='question-id'>{leg.questionId}</span> בחוברת</li>
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
      </div>
    );
  }
  return (
    <div>
      <h3>קוד שגוי</h3>
      <button onClick={() => tryingAgain()}>נסו שנית</button>
      {leg.alternateQuestionId !== 0 ?
        <div>
          <button onClick={() => { onMovingToAlternate() }}>החלפו שאלה</button>
          <h3>חשוב לזכור: שאלה חלופית מזכה בניקוד נמוך יותר משאלה מקורית</h3>
        </div>
        :
        <div>
          <button onClick={() => { onSkiping() }}>דלגו לשאלה הבאה</button>
          <h3>חשוב לזכור: דילוג על שאלה לא מזכה בניקוד </h3>
        </div>
      }
    </div>
  )
}