import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { ReactComponent as CameraSvg } from './CameraSvg.svg'


export default function AfterQuestion({ onOpenCamera, succeed }) {

  const { width, height } = useWindowSize()

  // useEffect(() => { 
  //   window.navigator.vibrate([200, 100, 200])
  //   console.log("in currectanswer usee")
  // },[])

  return (
    <div>
      {succeed ? 
      <>
        <p>כל הכבוד! תשובה נכונה!</p>
        <p>שלחו תמונה קבוצתית עם הקוד</p>
      </>
      :
      <>
        <p>לא נורא! בהצלחה בהמשך!</p>
        <p>שלחו תמונה קבוצתית</p>
      </>
      }

      <div className="camera-icon" onClick={() => onOpenCamera()}>
        <CameraSvg />
      </div>
      {succeed && 
      <Confetti
        width={width}
        height={height}
      />
      }
    </div>
  );
}