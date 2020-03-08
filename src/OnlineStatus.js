import React, { useState, useEffect } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';

export default function OnlineStatus({ /*teamsArray,*/ firebase, liatURL }) {

  const [progressArray, setProgressArray] = useState({})
  // const [teamsArray, setTeamsArray] = useState({})


  function convertTimeStamp(ts) {
    const d = ts.toDate();
    return d.getHours() + ":" + d.getMinutes();
  }
  useEffect(() => {
    const promises = firebase.loadAllTA().then((ta) => {
      return Object.keys(ta).map((groupNum) => {
        console.log('working on group', groupNum)
        const querySnapshot = firebase.getAllEvenstForGroup(groupNum)

        return querySnapshot.then((qs) => {
          let progress = { groupNum: groupNum, progress: [] }

          if (qs !== null && qs.docs.filter(doc => doc.data().legIndex > 0).length > 0) {
            progress = qs.docs.filter(doc => doc.data().legIndex > 0).map(doc => {
              const data = doc.data();
              const creationTime = convertTimeStamp(data.creationTime)
              console.log("data.creationTime", data.creationTime.toDate().toString())
              return {
                groupNum,
                leg: data.legIndex - 1,
                value: data.progress[data.legIndex - 1],
                creationTime: creationTime,
                imageSrc: `https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_${groupNum}%2F${data.legIndex - 1}%2Fimage?alt=media&token=36ad5bab-a780-4e3c-a816-1b6444221339`
              }
            })
          }
          return { groupNum, progress }
        })
      })
    })
    console.log("promises ",promises)
    promises.then((ps) => {
      Promise.all(ps).then((allProgresses) => {
      console.log("all progresses: ", allProgresses)
      const newPA = Object.assign({}, progressArray)
      allProgresses.forEach((prgrs) => {
        let emptyProgress = Array(10).fill(0).map(function (v, i) { return { leg: i, value: 0 } })
        if (prgrs.progress.length > 0) {
          newPA[prgrs.groupNum] = Object.assign(emptyProgress, prgrs.progress)
        } 
      })
      // console.log('setting porgress for g: ',groupNum, 'proress: ', prgrs)

      // const newPA = Object.assign({}, progressArray)
      // console.log("object assign for g: "+groupNum+" result: ",Object.assign(emptyProgress, prgrs))
      // newPA[groupNum] = Object.assign(emptyProgress, prgrs)
      console.log("new pa ", newPA)
      setProgressArray(newPA)

    })})





    console.log('finish')

  }, []);

  function progressSummery(p) {
    console.log("progress summary", p)
    const summary =  p.reduce((acc, val) => {
      if (val.value === 3) {
        return {original: acc.original+1, alternate: acc.alternate, skipped: acc.skipped}
      }
      if (val.value === 2) {
        return {original: acc.original, alternate: acc.alternate+1, skipped: acc.skipped}
      }
      if (val.value === 1) {
        return {original: acc.original, alternate: acc.alternate, skipped: acc.skipped+1}
      }
      if (val.value === 0) {
        return acc
      }
    }, {original: 0, alternate: 0, skipped: 0})
    console.log("summary", summary)
    return summary;
  }

  return (

    <div className="online-status">
      {Object.keys(progressArray).map((groupNum) => {
        return (
          <div key={'gn_' + groupNum}>
            <h1>{groupNum}</h1>
            <span>🙂: {progressSummery(progressArray[groupNum]).original}</span>
            <span>😐: {progressSummery(progressArray[groupNum]).alternate}</span>
            <span>🙁: {progressSummery(progressArray[groupNum]).skipped}</span>
            <Progress
              progress={progressArray[groupNum]}
              liatURL={liatURL}
              firebase={firebase} >
            </Progress>
            <br />
          </div>
        )
      })}
    </div>
  )

}