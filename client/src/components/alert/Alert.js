import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './alert.module.scss';

// *************************** ALERT COMPONENT *************************** //
const Alert = ({ alert }) => {
  return (
    (alert !== null && alert.length > 0 )
    &&
    alert.map(alertItem => (
      <div
        key={alertItem.id}
        className={`
          ${alertItem.alertType === 'success' ? style.alertSuccess : ''}
          ${alertItem.alertType === 'warning' ? style.alertWarning : ''}
          ${alertItem.alertType === 'danger' ? style.alertDanger : ''}
          ${style.alert}
        `}
      >
        { alertItem.msg }
      </div>
    ))
  );
};

// PROP TYPES
Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);