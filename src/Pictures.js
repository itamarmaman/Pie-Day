import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';

export default function Pictures({onFinishPicture, uploadImage}) {

  const [hasPicture, setHasPicture] = useState(false);
  const [pictures, setPictures] = useState([]);

  function onChange(picture) {
    console.log("on pic" , picture)
    setPictures(pictures.concat(picture[picture.length-1]))
    setHasPicture(true)
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
        />
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