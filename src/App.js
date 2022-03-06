import React, { useState, useEffect } from 'react';
import './App.css';
import SelectGroup from './SelectGroup'
import Header from './Header';
import QuestionForm from './QuestionForm'
import Win from './Win'
import OnlineStatus from './OnlineStatus'
import Welcome from './Welcome';
import Admin from './Admin';

export default function App({ firebase }) {

  var firebaseConfig = {
    apiKey: "AIzaSyCWxLs3JddONlH7i2sDuS8snXAYj5idgsc",
    authDomain: "pie-day-91621.firebaseapp.com",
    databaseURL: "https://pie-day-91621.firebaseio.com",
    projectId: "pie-day-91621",
    storageBucket: "pie-day-91621.appspot.com",
    messagingSenderId: "315194400949",
    appId: "1:315194400949:web:3a7013eeb1884d43a11efc"

  };


  const [groupNum, setGroupNum] = useState(null);
  const [legIndex, setLegIndex] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [finished, setFinished] = useState(false);
  const liatURL = new URLSearchParams(window.location.search).has("liat");
  const admin = new URLSearchParams(window.location.search).has("admin");
  const [welcome, setWelcome] = useState(true)
  const [teamsArray, setTeamsArray] = useState()
  const [showSpinner, setShowSpinner] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)


  function onGN(x) {
    const x_ = x.trim()
    if (x_ == groupNum + '^' + btoa(groupNum)) {
      return
    };
    console.log("GN ", x_)
    const split = x_.indexOf('^')
    if (split === -1) {
      return
    }

    const gn = x_.slice(0, split)
    if (btoa(gn) !== x_.slice(split + 1)) {
      return
    }
    setGroupNum(gn)
    setShowSpinner(true)
    firebase.loadTA(gn).then(async (ta) => {
      console.log("got teams array ", ta)
      setShowSpinner(false)
      setTeamsArray(ta)

      const querySnapShot = await firebase.getLatestEventForGroup(gn)

      if (querySnapShot == null) {
        setWelcome(true)
        console.log("sending init event for group ", gn)
        firebase.events().add({
          groupNum: gn,
          legIndex: 0,
          progress: progress,
          finish: false,
          creationTime: firebase.TIMESTAMP()
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

      } else {

        const event = querySnapShot.docs[0].data()
        /*const event = querySnapShot.docs.filter((e, i, arr) => e.data().legIndex === arr[0].data().legIndex).sort((e1, e2) => {
          if (e1.data().progress[legIndex - 1] === e2.data().progress[legIndex - 1]) {
            return (e1.data().creationTime - e2.data().creationTime)
          }
          return (e2.data().progress[legIndex - 1] - e1.data().progress[legIndex - 1])
        })[0].data()*/
        if(event.legIndex > 0  && hasCameraPermission) {
          setWelcome(false)
        }
        console.log("event ", event)
        setProgress(event.progress)
        setFinished(event.finish)
        setLegIndex(event.legIndex)
      }
      
   }).catch((ex) => {
     console.log("XXX", ex);
   })

    
  }


  useEffect(() => {
 
    const param = new URLSearchParams(window.location.search).get("team");
    console.log("in useEffect ", param)
    if (param) {
      onGN(param)
    }
  }, []);

  function hasNextLeg() {
    return legIndex < teamsArray[groupNum].length - 1;
  }

  function moveToNextLeg(eventStatus) {
    let eventObj = {
      groupNum: groupNum,
      legIndex: legIndex + 1,
      progress: progress,
      finish: !hasNextLeg(),
      creationTime: firebase.TIMESTAMP(),
      orgQuestion: teamsArray[groupNum][legIndex].questionId
    }
    if (eventStatus !== "org") {
      eventObj.altQuestion = teamsArray[groupNum][legIndex].alternateQuestionId
    }
    console.log('eventObj: ', eventObj)
    firebase.events().add(eventObj)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    if (!hasNextLeg()) {
      setFinished(true)
      return
    }
    setLegIndex(legIndex + 1)

  }

  function onHasCameraPermission(){
    setHasCameraPermission(true)
  }

  function onOrginalCorrectAnswer() {
    progress[legIndex] = 3
    setProgress(progress)
    moveToNextLeg("org")
  }
  function onAlternateCorrectAnswer() {
    progress[legIndex] = 2
    setProgress(progress)
    moveToNextLeg("alt")
  }
  function onSkipingQuestion() {
    console.log("skiping")
    progress[legIndex] = 1
    setProgress(progress)
    moveToNextLeg("skp")
  }

  function uploadImage(picture) {
    firebase.uploadImageForGroup(groupNum, legIndex, picture)
  }

  function progressSummery(p) {
    console.log('progressSummery')
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
    return summary;
  }

  function convertTimeStamp(ts) {
    const d = ts.toDate();
    return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  }

  if (admin) {
    return <Admin firebase={firebase}></Admin>
  }

  if (showSpinner) {
    return <div className="loading">
      <img src={require('./spinner.gif')}></img>
      </div>
  }
  if (liatURL) {
    return <OnlineStatus progressSummery={progressSummery} firebase={firebase} liatURL={liatURL} convertTimeStamp={convertTimeStamp}></OnlineStatus>
  }
  if (!groupNum) {
    return (
      <div className="App">
        <h4>unavailable link</h4>
        {/*<SelectGroup onGroupNum={onGN}></SelectGroup>*/}
      </div>
    );
  }
  if (groupNum && welcome) {
    return (
      <div className="App">
        <Welcome onHasCameraPermission={onHasCameraPermission} onFinishWelcome={() => setWelcome(false)}></Welcome>
      </div>
    )
  }
  return (
    <div className="App">
      <Header groupNum={groupNum} progress={progress}></Header>
      {!finished ?
        <QuestionForm
          leg={teamsArray[groupNum][legIndex]}
          onOrginalCorrectAnswer={onOrginalCorrectAnswer}
          onAlternateCorrectAnswer={onAlternateCorrectAnswer}
          onSkipingQuestion={onSkipingQuestion}
          uploadImage={uploadImage}
        >
        </QuestionForm>
        : <Win groupNum={groupNum} progress={progress} progressSummery={progressSummery} firebase={firebase} convertTimeStamp={convertTimeStamp}></Win>}
    </div>
  )
}