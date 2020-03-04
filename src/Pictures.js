import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import Camera , {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen().then(() => console.log("succsess"), (e) => console.log("eror: ",e));
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

export default function Pictures({onFinishPicture, uploadImage}) {

  const [hasPicture, setHasPicture] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [isSelfie, setIsSelfie] = useState(true)

  function onChange(pic) {
    console.log("on pic")
    setPictures([pic[pic.length-1]])
    setHasPicture(true)
  }

  function srcToFile(src, fileName, mimeType){
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
  }

  async function handleTakePhoto (dataUri) {
    console.log("on handle")
    const arr = dataUri.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const fileType = mime.split("/")[1]
    const f = await srcToFile(dataUri, "my_file."+fileType, mime)
    onChange([f])
  }

  function onSave() {
    uploadImage(pictures[0])
    onFinishPicture()
  }

  function getSrc() {
    if (pictures.length > 0 )
      return URL.createObjectURL(pictures[0]);
  }

  function getStyle() { 
    return {"backgroundImage": "url('"+getSrc()+"')"}
  }
  
  function onRetry() {
    setHasPicture(false)
    setPictures([])
  }

  function switchCamera() {
    setIsSelfie(!isSelfie)
  }

  useEffect(() => {

    if (!hasPicture) {
      openFullscreen(document.getElementsByClassName("camera")[0])
    }
   
  })

  return (
    <div>
      {/* <ImageUploader
        withIcon={true}
        buttonText='Choose images'
        onChange={(picture) => onChange(picture)}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        // withPreview = {true}
        singleImage = {true}
        withIcon = {false}
        
      /> */}
      {!hasPicture ?
        <div className="camera">

          <img src={require('./switch_camera.png')} className="switch-camera" onClick={() => switchCamera()}></img>
          <a href="#" onClick={() => onFinishPicture()} className="close-camera close"> </a>
          <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            idealFacingMode = {isSelfie ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
            isImageMirror = {isSelfie}
            isFullScreen = {true}
            id="camera"
          />
        </div>
      : null }
      {hasPicture ?
        <div className="show-img-preview fullscreen" style={getStyle()}>
          <button onClick = {() => onSave()} className="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
              </path>
            </svg>
          </button>
          <a href="#" onClick={() => onRetry()} className="close-camera close"> </a> 
        </div>
      : null}
    </div>
  )
}