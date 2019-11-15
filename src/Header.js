import React, { useState } from 'react';

export default function Header({groupNum}) {

  return (
    <div>
      <h2>Hello group number {groupNum}!</h2>
    </div>
  );
}