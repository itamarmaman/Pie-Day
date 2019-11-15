import React, { useState } from 'react';

export default function SelectGroup({onGroupNum}) {
  const [groupNum, setGroupNum] = useState();

  return (
    <div>
      <p>הכנס מספר קבוצה</p>
      <input type="text" name="groupNumber" value={groupNum} onChange={(e) => setGroupNum(e.target.value)}/>
      <br></br>
      <button type="button" onClick={() => onGroupNum(groupNum)}>אישור</button>
    </div>
  );
}