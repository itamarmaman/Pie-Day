import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function Header({groupNum, progress}) {

  return (
    <div>
      <Progress progress = {progress}></Progress>
      <h3>Hello group number {groupNum}!</h3>
    </div>
  );
}