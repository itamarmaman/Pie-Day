import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";

export default function Progress({progress, liatURL}) {

  console.log("in progres", progress)
  function getText(step, index) {
    switch (step) {
      case 0: return index + ((liatURL) ? 0 : 1)
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
        {progress.map((p) => 
          <li key = {'leg'+p.leg} className={getStatus(p.value, p.leg)} >
            <div className="progress-marker" data-text={getText(p.value, p.leg)}>
              {liatURL ?  
                <div className="progress-text">
                  <h4 className="progress-title">{p.creationTime} step {p.leg} </h4>
                  <img src={p.imageSrc} className="image-progress"></img>
                </div>
              : null}
            </div>
          </li>)
        }
        </ul>
    </div>
  );
}