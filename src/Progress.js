import React, { useState } from 'react';
import "../node_modules/progress-tracker/src/styles/progress-tracker.scss";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

// customStyles.content["z-index"] = '100';


Modal.setAppElement('#root')



export default function Progress({ progress, liatURL }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [progressInfo, setProgressInfo] = useState({});
  const [showImg, setShowImg] = useState(true);



  function openModal(p) {
    setShowImg(true)
    if (liatURL && (p.value !== 0)) {
      console.log("p: ",p)
      setIsOpen(true);
      setProgressInfo(p)
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);
  }


  console.log("in progres", progress)
  function getText(index) {
    return index + 1;
  }

  function getStatus(step, index) {
    var c = ["progress-step"];
    if (step != 0) c.push("is-complete")
    if (step === 3) c.push("success")
    if (step === 2) c.push("alternative")
    if (step === 1) c.push("failure")
    if (progress.findIndex((e) => e.value === 0) === index) c.push("is-active")
    return c.join(" ")
  }

  function onError(e)
  {
    console.log(e)
    setShowImg(false)
  }

  return (
    <div className="progress">

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <a href="#" onClick={closeModal} className="close close-camera"> </a>
        <br/>
        {showImg &&<img src={progressInfo.imageSrc} onError={(e) => onError(e)} className="image-progress-modal"></img>}
        <h4>קבוצה: {progressInfo.groupNum}</h4>
        <h4>שלב: {progressInfo.leg + 1} 
          <span className={getStatus(progressInfo.value, -1)}> 
            <span className="progress-title"></span>
            <br/>
            <span>{progressInfo.creationTime}</span>
          </span>
        </h4>
        <button onClick={() => {setProgressInfo(progress[progressInfo.leg + 1]); setShowImg(true)}} disabled={progressInfo.leg === 9 || (progress[progressInfo.leg + 1] && progress[progressInfo.leg + 1].value === 0) }>next</button>
        <button onClick={() => {setProgressInfo(progress[progressInfo.leg - 1]); setShowImg(true)}} disabled={progressInfo.leg === 0}>prev</button>
        
      </Modal>

      <ul className="progress-tracker">
        {progress.map((p) =>
          <li key={'leg' + p.leg} className={getStatus(p.value, p.leg)} onClick={() => openModal(p)}>
            <div className="progress-marker" data-text={getText(p.leg)}>
              <div className="progress-text">
                {liatURL ?
                  <div>
                    <h4 className="progress-title step-info"></h4>
                    <h5>{p.creationTime}</h5>
                  </div>
                  : <h4 className="progress-title step-info"></h4>}
              </div>

            </div>
          </li>)
        }
      </ul>
    </div>
  );
}