import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function Header({groupNum, progress}) {

  // const [groupProgress, setGroupProgress] = useState(progress.map(function (val, index) { return {value: val, leg: index}}))

  const groupProgress = progress.map(function (val, index) { return {value: val, leg: index}})

  return (
    <div className="header">
      <h3 className="group">קבוצה: {groupNum}</h3>
      <Progress progress = {groupProgress}></Progress>
    </div>
  );
}
// https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_2%2F0%2Fimage.png?alt=media&token=32f44ac7-6856-4417-bbe0-6f007827906f
// https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_2%2F1%2Fimage.png?alt=media&token=36ad5bab-a780-4e3c-a816-1b6444221339

// https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_2%2F2%2Fimage.png?alt=media&token=26bebb49-4a29-4add-878c-80aa184c3611
// https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_2%2F4%2Fimage.png?alt=media&token=36ad5bab-a780-4e3c-a816-1b6444221339