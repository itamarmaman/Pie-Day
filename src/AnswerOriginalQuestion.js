import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';


export default function AnswerOriginalQuestion({leg, onCorrectAnswer, onMovingToAlternate, uploadImage}) {
  const [userCode, setUserCode] = useState("");
  const [giveUp, setGiveUp] = useState(false);
  const [pictures, setPictures] = useState([]);

  function validateAnswer() {
    if (userCode === leg.answerCode)
    {
      onCorrectAnswer()
      setUserCode("")
    }
    else {
      setGiveUp(true)
    }
  }
  function tryingAgain() {
    setGiveUp(false)
    setUserCode("")
  }
  function onChange(picture) {
    console.log("on pic" , picture)
    setPictures(pictures.concat(picture))
    uploadImage(picture[0])

  }

  function getSrc() {
    if (pictures.length >0 )
      return URL.createObjectURL(pictures[0]);
    return "https://img.fifa.com/image/upload/t_l4/v1568781948/gzuddxhx4evpfd5q5ean.jpg";
  }

  if (!giveUp) {
    return (
      <div>
        <h3>Answer Question Number {leg.questionId}</h3>
        <p>Enter the code from the station (dont forget to take a pic)</p>
        <input type = "text" name = "" value = {userCode} onChange = {(e) => setUserCode(e.target.value)}></input>
        <button onClick = {() => validateAnswer()}>אישור</button>
        <img src={getSrc()}/>
        <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={(picture) => onChange(picture)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                // withPreview = {true}
            />
      </div>
  );
    }
  return (
    <div>
      <h3>You are wrong</h3>
      <br></br>
      <button onClick = {() => tryingAgain()}>Try Again</button>
      <button onClick = {() => {onMovingToAlternate()}}>Switch question</button>
      <h3>Remember: Switching question is allways worse than answaring on the original one</h3>
    </div>
  )
}