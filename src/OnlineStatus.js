import React, { useState, useEffect } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function OnlineStatus({ teamsArray, firebase }) {

  const [progressArray, setProgressArray] = useState({})


  useEffect(() => {
    Object.keys(teamsArray).filter((gn) => !progressArray[gn]).map(async (groupNum) => {
      const querySnapshot = await firebase.getLatestEventForGroup(groupNum)
      if (querySnapshot == null) {
        const b = {}
        b[groupNum] = Array(10).fill(0)
        setProgressArray(Object.assign({}, progressArray, b))
      } else {
        const progress = querySnapshot.docs[0].data().progress
        const b = {}
        b[groupNum] = progress
        setProgressArray(Object.assign({}, progressArray, b))
      }})
      
  }, [progressArray]);

  return (
    <div>
      {Object.keys(progressArray).map((groupNum) => {
        return (
          <div key={groupNum}>
            <h1>{groupNum}</h1>
            <Progress progress={progressArray[groupNum]}></Progress>
            <br />
          </div>
        )
      })}
    </div>
  )

}