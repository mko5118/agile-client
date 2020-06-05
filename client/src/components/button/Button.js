import React, { } from 'react';
import PropTypes from 'prop-types';

import style from './button.module.scss';

// *************************** BUTTON COMPONENT *************************** //
const Button = ({ landingPage, addButton, deleteButton, addCompany, deleteCompany, clientButton, children, onClick, ...otherProps }) => {
  return (
    <button
      className={`
        ${landingPage ? style.landingPage : ''}
        ${addButton ? style.addButton : ''}
        ${deleteButton ? style.deleteButton : ''}
        ${addCompany ? style.addCompany : ''}
        ${deleteCompany ? style.deleteCompany : ''}
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

// PROP TYPES
Button.propTypes = { 
  onClick: PropTypes.func,
};

export default Button;