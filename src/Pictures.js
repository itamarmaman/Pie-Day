import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import Camera , {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Pictures({onFinishPicture, uploadImage}) {

  const [hasPicture, setHasPicture] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [mode, setMode] = useState(FACING_MODES.USER)

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

  function onRetry() {
    setHasPicture(false)
    setPictures([])
  }

  function switchCamera() {
    if (mode === FACING_MODES.ENVIRONMENT) {
      setMode(FACING_MODES.USER)
    }
    else  {
      setMode(FACING_MODES.ENVIRONMENT)
    }
  }

  return (
    <div>
      <button onClick = {() => onFinishPicture()}>X</button>
      <ImageUploader
        withIcon={true}
        buttonText='Choose images'
        onChange={(picture) => onChange(picture)}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        // withPreview = {true}
        singleImage = {true}
        withIcon = {false}
        
      />
      {!hasPicture ?
        <div>
          <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          idealFacingMode = {mode}
          />
          <button onClick={() => switchCamera()}>switchCamera</button>
        </div>
      : null }
      
      <img src={getSrc()}/>
      {hasPicture ?
        <div>
          <button onClick = {() => onSave()}>ok</button>
          <button onClick = {() => onRetry()}>retry</button>  
        </div>
      : null}
    </div>
  )
}