import React, { useState, useEffect } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function OnlineStatus({ teamsArray, firebase, liatURL }) {

  const [progressArray, setProgressArray] = useState( {})

  function convertTimeStamp(ts) {
    const d = ts.toDate();
    return d.getHours()+":"+d.getMinutes();
  }
  useEffect(() => {
    Object.keys(teamsArray).filter((gn) => !progressArray[gn]).map(async (groupNum) => {
      console.log('working on group', groupNum)
      const querySnapshot = await firebase.getAllEvenstForGroup(groupNum)
            
      let emptyProgress =  Array(10).fill(0).map(function (v,i) {return {leg:i+1, value: 0}})
      let progress = {}

      if (querySnapshot != null) {
        progress = querySnapshot.docs.filter(doc => doc.data().legIndex > 0).map(doc=>{
          const data = doc.data();
          const creationTime = convertTimeStamp(data.creationTime)
          console.log("data.creationTime", data.creationTime.toDate().toString())
          return {
            groupNum,
            leg: data.legIndex, 
            value: data.progress[data.legIndex-1], 
            creationTime : creationTime, 
            imageSrc: `https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_${groupNum}%2F${data.legIndex-1}%2Fimage?alt=media&token=36ad5bab-a780-4e3c-a816-1b6444221339`
        }})
      }
      console.log('g: ',groupNum, 'proress: ', progress)
      const newPA = Object.assign({}, progressArray)
      newPA[groupNum] = Object.assign(emptyProgress, progress) 
      setProgressArray(newPA)
      })
      
  }, [progressArray]);


  return (
    
    <div>
      {Object.keys(progressArray).map((groupNum) => {
        return (
          <div key={'gn_'+groupNum}>
            <h1>{groupNum}</h1>
            <Progress
              progress = {progressArray[groupNum]}
              liatURL = {liatURL}
              firebase = {firebase} >
              </Progress>
            <br />
          </div>
        )
      })}
    </div>
  )

}