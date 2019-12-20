import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";

export default function Progress({progress}) {

  console.log("in progres", progress)
  function getText(step, index) {
    switch (step) {
      case 0: return index + 1
      case 1: return "X";
      case 2: return "✓" 
      case 3: return "✓" 
    }
  }

  function getStatus(step, index) { 
    var c =["progress-step"];
    if (step === 3 || step === 2) c.push("is-complete")
    if (step === 2) c.push("alternative")
    if (step === 1) c.push("failure")
    if (progress.indexOf(0) === index) c.push("is-active")
    return c.join(" ")
  }
  return (
    <div>
      <ul className="progress-tracker">
        {progress.map((step, index) => 
          <li key = {index} className={getStatus(step, index)} >
            <div className="progress-marker" data-text={getText(step, index)}> </div>
            </li>)
        }
        </ul>
    </div>
  );
}