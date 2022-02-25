import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import PieGif from './pie.gif'

export default function Win({ groupNum, progress, progressSummery }) {
  
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConffetti] = useState(true)

  const groupProgress = progress.map(function (val, index) { return {value: val, leg: index}})

  setTimeout(() => setShowConffetti(false), 10000)
  return (
    <div>
      {showConfetti ? <Confetti
      width={width}
      height={height}
      /> : null}
      <h1>כל הכבוד!</h1>
      <h1>סיימתם את המסלול!</h1>
      <h1>
        {/*<span> {progressArray[groupNum][lastActiveAction(groupNum)].creationTime} </span>*/}
        <span>😃: {progressSummery(groupProgress).original} </span>
        <span>😐: {progressSummery(groupProgress).alternate} </span>
        <span>😭: {progressSummery(groupProgress).skipped} </span>
      </h1>
      <img src={PieGif} className="pie-gif" />
    </div>
  );
}