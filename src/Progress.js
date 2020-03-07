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



  function openModal(p) {
    if (liatURL) {
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
  function getText(step, index) {
    return index + ((liatURL) ? 0 : 1);
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

  return (
    <div className="progress">

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <a href="#" onClick={closeModal} className="close close-camera"> </a>
        <img src={progressInfo.imageSrc} className="image-progress-modal"></img>
        <h4>קבוצה: {progressInfo.groupNum}</h4>
        <h4>שלב: {progressInfo.leg} 
          <span className={getStatus(progressInfo.value, -1)}> 
            <span className="progress-title"></span>
            <span>{progressInfo.creationTime}</span>
          </span>
        </h4>
      </Modal>

      <ul className="progress-tracker">
        {progress.map((p) =>
          <li key={'leg' + p.leg} className={getStatus(p.value, p.leg)} onClick={() => openModal(p)}>
            <div className="progress-marker" data-text={getText(p.value, p.leg)}>
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