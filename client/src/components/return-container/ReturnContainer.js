import React, { } from 'react';
import { MdKeyboardReturn } from 'react-icons/md';

import style from './return-container.module.scss';

// *************************** RETURN CONTAINER COMPONENT *************************** //
const ReturnContainer = ({ onClick, returnToClient, returnToTasks }) => {
  // 'onClick' functions passed as props from parent components

  let text;

  if (returnToClient) text = 'Return to Client';
  if (returnToTasks) text = 'Return to Tasks';

  return (
    <div 
      className={style.returnContainer}
      onClick={onClick}
    >
      <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
      <p className={style.returnText}>
        {text}
      </p>
    </div>
  )
};

export default ReturnContainer;
