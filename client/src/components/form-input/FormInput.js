import React, { } from 'react';
import PropTypes from 'prop-types';

import style from './form-input.module.scss';

// *************************** FORM INPUT COMPONENT *************************** //
const FormInput = ({ clientInput, onChange, ...otherProps }) => {
  return (
    <input 
      className={`
        ${clientInput ? style.clientInput : ''}
        ${style.formInput}
      `}
      onChange={onChange}
      {...otherProps}
    />
  )
};

// PROP TYPES
FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FormInput;