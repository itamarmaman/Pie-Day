import React, { useState, useEffect } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { ReactComponent as BackSvg } from './back.svg'


export default function Pictures({ onFinishPicture, uploadImage }) {

  const [hasPicture, setHasPicture] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [isSelfie, setIsSelfie] = useState(true)
  
  function onChange(pic) {
    console.log("on pic")
    setPictures([pic[pic.length - 1]])
    setHasPicture(true)
  }

  function srcToFile(src, fileName, mimeType) {
    return (fetch(src)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
    );
  }

  async function handleTakePhoto(dataUri) {
    console.log("on handle")
    const arr = dataUri.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const fileType = mime.split("/")[1]
    const f = await srcToFile(dataUri, "my_file." + fileType, mime)
    onChange([f])
  }

  function onSave() {
    uploadImage(pictures[0])
    onFinishPicture()
  }

  function getSrc() {
    if (pictures.length > 0)
      return URL.createObjectURL(pictures[0]);
  }

  function onRetry() {
    setHasPicture(false)
    setPictures([])
  }

  function switchCamera() {
    setIsSelfie(!isSelfie)
  }

  return (
    <div>
      {hasPicture ?
        <div className="show-img-preview">
          <button onClick={() => onRetry()} className='back-arrow'>התמונה לא טובה? צלמו שוב!</button>
          <button onClick={() => onSave()} className="send-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
              </path>
            </svg>
          </button>
          <img src={getSrc()}/>
        </div>
        :
        <div className="camera">
          <img src={require('./switch_camera.png')} className="switch-camera" onClick={() => switchCamera()}></img>
          <a href="#" onClick={() => onFinishPicture()} className="close-camera close"> </a>
          <Camera
            onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
            idealFacingMode={isSelfie ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
            isImageMirror={isSelfie}
            isFullScreen={true}
            id="camera"
          />
        </div>
      }
    </div>
  )
}