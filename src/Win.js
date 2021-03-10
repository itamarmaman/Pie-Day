import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import PieGif from './pie.gif'

export default function Win({}) {
  
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConffetti] = useState(true)

  setTimeout(() => setShowConffetti(false), 10000)
  return (
    <div>
      {showConfetti ? <Confetti
      width={width}
      height={height}
      /> : null}
      <h1>כל הכבוד!</h1>
      <h1>סיימתם את המסלול!</h1>
      <h1>חזרו לנקודת הסיום</h1>
      <img src={PieGif} className="pie-gif" />
    </div>
  );
}