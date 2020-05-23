import React, { } from 'react';

import style from './button.module.scss';

// *************************** BUTTON COMPONENT *************************** //
const Button = ({ landingPage, children, onClick, ...otherProps }) => {
  return (
    <button
      className={`
        ${landingPage ? style.landingPage : ''}
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