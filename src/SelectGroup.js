import React, { useState } from 'react';

export default function SelectGroup({onGroupNum}) {
  const [groupNum, setGroupNum] = useState('');

  return (
    <div>
      <p>הכנס מספר קבוצה</p>
      <form onSubmit={(e) => {e.preventDefault();
                              onGroupNum(groupNum)}}>
        <input type="number" pattern='\d*' name="groupNumber" value={groupNum} onChange={(e) => setGroupNum(e.target.value)}/>
        <br></br>
        <button type="submit">אישור</button>
      </form>
    </div>
  );
}