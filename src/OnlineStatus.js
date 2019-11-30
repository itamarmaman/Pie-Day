import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function OnlineStatus({progressArray}) {
  

  return (
    <div> 
    {Object.keys(progressArray).map((groupNum) => {
      return (
      <div>
        <h1>{groupNum}</h1>
        <Progress progress = {progressArray[groupNum]}></Progress>
        <br/>
      </div>
      )
    } )}
    </div>
  )

}