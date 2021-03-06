import React, { useState, useEffect } from 'react';
import PieGifStart from './pie2.gif'

export default function Welcome({ onHasCameraPermission, onFinishWelcome }) {

  const [showButton, setShowButton] = useState(false)
  const [error, setError] = useState()
  useEffect(() => {

    // navigator.permissions.query({ name: 'camera' }).then((permissionObj) => {
    //   console.log('permission *** ', permissionObj.state);
    //   if (permissionObj.state === "granted") { 
    //     setShowButton(true)
    //     onHasCameraPermission()
    //   }
    //   else {
    //     return 
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: "environment" },
    })
      // }
      // })
      .then((mediaStream) => {
        console.log("got response@@@@: ", mediaStream)
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }
        setShowButton(true)
        onHasCameraPermission()
      })
       .catch((error) => {
         console.log('Got error :', error);
         setError(error)
       })

  }, [])

  return (
    <div>
      <h1>ברוכים הבאים ליום הפאי!</h1>
      {error? error : null}
      {showButton ?
        <button onClick={() => onFinishWelcome()}>למשחק!</button>
        : <h3>תנו גישה למצלמה לפני שמתחילים</h3>}
      <br/>
      <br/>
      <img src={PieGifStart} className="pie-gif" />
    </div>
  );
}
