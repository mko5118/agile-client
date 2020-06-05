import React, { } from 'react';

import style from './button.module.scss';

// *************************** BUTTON COMPONENT *************************** //
const Button = ({ landingPage, clientButton, children, onClick, ...otherProps }) => {
  return (
    <button
      className={`
        ${landingPage ? style.landingPage : ''}
        ${clientButton ? style.clientButton : ''}
        ${style.button}
      `}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  )
};

export default Button;