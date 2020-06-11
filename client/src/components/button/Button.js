import React, { } from 'react';
import PropTypes from 'prop-types';

import style from './button.module.scss';

// *************************** BUTTON COMPONENT *************************** //
const Button = ({ landingPage, signinPage, signupPage, addButton, deleteButton, addCompany, deleteCompany, clientButton, todoButton, children, onClick, ...otherProps }) => {
  return (
    <button
      className={`
        ${landingPage ? style.landingPage : ''}
        ${signinPage ? style.signinPage : ''}
        ${signupPage ? style.signupPage : ''}
        ${addButton ? style.addButton : ''}
        ${deleteButton ? style.deleteButton : ''}
        ${addCompany ? style.addCompany : ''}
        ${deleteCompany ? style.deleteCompany : ''}
        ${clientButton ? style.clientButton : ''}
        ${todoButton ? style.todoButton : ''}
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