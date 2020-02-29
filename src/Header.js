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