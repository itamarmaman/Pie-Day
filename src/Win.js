import React, { useState, useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import PieGif from './pie.gif'

export default function Win({ groupNum, progress, progressSummery, firebase, convertTimeStamp }) {
  
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConffetti] = useState(true)
  const [finishTime, setFinishTime] = useState('')


  useEffect(() => {
    getFinishTime().then((p) => setFinishTime(p))
  }, [finishTime])

  const groupProgress = progress.map(function (val, index) { return {value: val, leg: index}})


  async function getFinishTime() {
    return convertTimeStamp((await firebase.getLatestEventForGroup(groupNum)).docs[0].data().creationTime)
  }

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
        <span>{finishTime}</span>
        <br/>
        <span>😃: {progressSummery(groupProgress).original} </span>
        <span>😐: {progressSummery(groupProgress).alternate} </span>
        <span>😭: {progressSummery(groupProgress).skipped} </span>
      </h1>
      <img src={PieGif} className="pie-gif" />
    </div>
  );
}