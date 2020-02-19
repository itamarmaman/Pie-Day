import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

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
      <h1>חזרו לנקודת ההתחלה</h1>
    </div>
  );
}