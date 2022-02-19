import React, { useState, useEffect } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Progress from './Progress';
import { useAsync } from 'react-use';
import waitGif from './wait.gif'

export default function OnlineStatus({ /*teamsArray,*/ firebase, liatURL }) {

  const [progressArray, setProgressArray] = useState({})
  // const [teamsArray, setTeamsArray] = useState({})
  const [isOpen, setIsOpen] = useState([])
  const [showImg, setShowImg] = useState(false)
  const [reload, setReload] = useState(false)


  function convertTimeStamp(ts) {
    const d = ts.toDate();
    return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setReload(reload=>!reload)
      console.log('reloaded')
    }, 10000)

  }, [])


  useEffect(() => {
    console.log('start ',reload)

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
                finish: data.finish,
                imageSrc: `https://firebasestorage.googleapis.com/v0/b/pie-day-91621.appspot.com/o/group_${groupNum}%2F${data.legIndex - 1}%2Fimage?alt=media&token=36ad5bab-a780-4e3c-a816-1b6444221339`
              }
            })
          }
          return { groupNum, progress }
        })
      })
    })
    console.log("promises ", promises)
    promises.then((ps) => {
      Promise.all(ps).then((allProgresses) => {
        console.log("all progresses: ", allProgresses)
        const newPA = Object.assign({}, progressArray)
        let hasData = false
        allProgresses.forEach((prgrs) => {
          let emptyProgress = Array(10).fill(0).map(function (v, i) { return { leg: i, value: 0 } })
          if (prgrs.progress.length > 0) {
            newPA[prgrs.groupNum] = Object.assign(emptyProgress, prgrs.progress)
            hasData = true
          }
        })
        setShowImg(!hasData)
        // console.log('setting porgress for g: ',groupNum, 'proress: ', prgrs)

        // const newPA = Object.assign({}, progressArray)
        // console.log("object assign for g: "+groupNum+" result: ",Object.assign(emptyProgress, prgrs))
        // newPA[groupNum] = Object.assign(emptyProgress, prgrs)
        console.log("new pa ", newPA)
        setProgressArray(newPA)
        const newIsOpen = Array(Object.keys(newPA).length).fill(false).map((v, i)=>isOpen[i] || false)
        setIsOpen(newIsOpen)
      })
    })





    console.log('finish isOpen', isOpen)

  }, [reload]);


  function progressSummery(p) {
    console.log("progress summary", p)
    const summary = p.reduce((acc, val) => {
      if (val.value === 3) {
        return { original: acc.original + 1, alternate: acc.alternate, skipped: acc.skipped }
      }
      if (val.value === 2) {
        return { original: acc.original, alternate: acc.alternate + 1, skipped: acc.skipped }
      }
      if (val.value === 1) {
        return { original: acc.original, alternate: acc.alternate, skipped: acc.skipped + 1 }
      }
      if (val.value === 0) {
        return acc
      }
    }, { original: 0, alternate: 0, skipped: 0 })
    console.log("summary", summary)
    return summary;
  }

  function sortGroups(grpA, grpB) {
    const grpAStatus = progressSummery(progressArray[grpA])
    const grpBStatus = progressSummery(progressArray[grpB])
    const grpAprogres = progressArray[grpA][lastActiveAction(grpA)]
    const grpBprogres = progressArray[grpB][lastActiveAction(grpB)]
    if (grpAStatus.original > grpBStatus.original) return -1
    if (grpAStatus.original < grpBStatus.original) return 1
    if (grpAStatus.alternate > grpBStatus.alternate) return -1
    if (grpAStatus.alternate < grpBStatus.alternate) return 1
    if (grpAprogres.finish && grpBprogres.finish) return grpAprogres.creationTime - grpBprogres.creationTime
    if (grpAprogres.finish) return -1
    if (grpBprogres.finish) return 1
    return 0
  }

  function lastActiveAction(groupNum) {
    const index = progressArray[groupNum].slice().reverse().findIndex(obj => obj.value != 0);
    return progressArray[groupNum].length - 1 - index
  }

  function openClose(ind) {
    const newIsOpen = isOpen.slice()
    newIsOpen[ind] = !isOpen[ind]
    console.log("newIsOpen", newIsOpen)
    setIsOpen(newIsOpen)
  }

  return (

    <div className="online-status">
      {showImg ? <img src={waitGif} /> :
        <>
          <button onClick={() => setIsOpen(Array(isOpen.length).fill(false))}>צמצם הכל</button>
          <button onClick={() => setIsOpen(Array(isOpen.length).fill(true))}>הרחב הכל</button>
          {Object.keys(progressArray).sort(sortGroups).map((groupNum, ind) => {
            return (
              <div key={'gn_' + groupNum}>
                <div onClick={() => openClose(ind)}>
                  <h1>{groupNum})
              <span> {progressArray[groupNum][lastActiveAction(groupNum)].creationTime} </span>
                    <span>😃: {progressSummery(progressArray[groupNum]).original} </span>
                    <span>😐: {progressSummery(progressArray[groupNum]).alternate} </span>
                    <span>😭: {progressSummery(progressArray[groupNum]).skipped} </span>
                  </h1>
                </div>
                {isOpen[ind] &&
                  <Progress
                    progress={progressArray[groupNum]}
                    liatURL={liatURL}
                    firebase={firebase} >
                  </Progress>
                }
                <hr />
              </div>
            )
          })}
        </>}
    </div>
  )

}