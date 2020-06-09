import React, { } from 'react';

import style from './form-text-area.module.scss';

// *************************** FORM TEXT AREA COMPONENT *************************** //
const FormTextArea = ({ clientTextArea, onChange, ...otherProps }) => {
  return (
    <textarea 
      className={`
        ${clientTextArea ? clientTextArea : ''}
        ${style.formTextArea}
      `}
      onChange={onChange}
      {...otherProps}
    />
  )
};

export default FormTextArea;