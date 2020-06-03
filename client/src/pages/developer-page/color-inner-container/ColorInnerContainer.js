import React, { } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

import style from './color-inner-container.module.scss';

// *************************** COLOR INNER CONTAINER COMPONENT *************************** //
const ColorInnerContainer = ({ title, hexcode, white, black, darkGrey, lightGrey, grey, stoplightYellow, stoplightRed, strongBlue, lightBlue, navyBlue, brightBlue, offBlue, darkTeal, lightTeal, stoplightGreen, jungleGreen, strongOrange, softOrange, lightOrange, flamingoPink }) => {
  return (
    <div className={style.colorInnerContainer}>
      <h3 className={style.colorName}>{title}</h3>
      <p className={style.colorText}>
        <BsFillCircleFill 
          className={`
            ${style.icon}
            ${white ? style.whiteIcon : ''}
            ${black ? style.blackIcon : ''}
            ${darkGrey ? style.darkGreyIcon : ''}
            ${lightGrey ? style.lightGreyIcon : ''}
            ${grey ? style.greyIcon : ''}
            ${stoplightYellow ? style.stoplightYellowIcon : ''}
            ${stoplightRed ? style.stoplightRedIcon : ''}
            ${strongBlue ? style.strongBlueIcon : ''}
            ${lightBlue ? style.lightBlueIcon : ''}
            ${navyBlue ? style.navyBlueIcon : ''}
            ${brightBlue ? style.brightBlueIcon : ''}
            ${offBlue ? style.offBlueIcon : ''}
            ${darkTeal ? style.darkTealIcon : ''}
            ${lightTeal ? style.lightTealIcon : ''}
            ${stoplightGreen ? style.stoplightGreenIcon : ''}
            ${jungleGreen ? style.jungleGreenIcon : ''}
            ${strongOrange ? style.strongOrangeIcon : ''}
            ${softOrange ? style.softOrangeIcon : ''}
            ${lightOrange ? style.lightOrangeIcon : ''}
            ${flamingoPink ? style.flamingoPinkIcon : ''}
          `} 
        />
        {hexcode}
      </p>
    </div>
  )
};

// PROP TYPES
ColorInnerContainer.propTypes = {
  title: PropTypes.string.isRequired,
  hexcode: PropTypes.string.isRequired,
};


export default ColorInnerContainer;