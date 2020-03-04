import React, { useState } from 'react';

export default function Admin({ firebase }) {

  const [teamsArray, setTeamsArray] = useState("")
  const [error, setError] = useState()
  const [status, setStatus] = useState()

  async function onSubmit () {
    try {
      const config = JSON.parse(teamsArray)
      setStatus(await Promise.all(Object.keys(config).map((gn) => {
        const groupConfig = {}
        groupConfig[gn] = config[gn]
        return firebase.updateConfig(gn, groupConfig )
      })))
      setError()
    }
    catch(ex) {
      setError("got exception while parsing json " + ex)
    }
  }

  return (
    <div className="admin">
      {error ? error : status? status: null}
      <button onClick={() => onSubmit()}>submit</button>
      <br/>
      <textarea onChange={(e) => setTeamsArray(e.target.value)} rows="100" cols="100"></textarea>
    </div>
  );
}