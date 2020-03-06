import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { ReactComponent as CameraSvg } from './CameraSvg.svg'


export default function CorrectAnswer({ onOpenCamera }) {

  const { width, height } = useWindowSize()

  // useEffect(() => { 
  //   window.navigator.vibrate([200, 100, 200])
  //   console.log("in currectanswer usee")
  // },[])

  return (
    <div>
      <p>כל הכבוד! תשובה נכונה!</p>
      <p>שלחו תמונה קבוצתית עם הקוד</p>
      <div className="camera-icon" onClick={() => onOpenCamera()}>
        <CameraSvg />
      </div>
      <Confetti
        width={width}
        height={height}
      />
    </div>
  );
}