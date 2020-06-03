import React, { } from 'react';

import ColorInnerContainer from './color-inner-container/ColorInnerContainer';

import style from './developer-page.module.scss';

// *************************** DEVELOPER PAGE COMPONENT *************************** //
const DeveloperPage = () => {
  return (
    <div className={style.developerPage}>

      <h1 className={style.title}>Developer Page</h1>

      <div className={style.colorContainer}>
        <h2 className={style.colorTitle}>Colors</h2>
        <ColorInnerContainer title='White' hexcode='#FFFFFF' white />
        <ColorInnerContainer title='Black' hexcode='#050500' black />
        <ColorInnerContainer title='Dark-Grey' hexcode='#878789' darkGrey />
        <ColorInnerContainer title='Light-Grey' hexcode='#F2F2F2' lightGrey />
        <ColorInnerContainer title='Grey' hexcode='#DBDDE3' grey />
        <ColorInnerContainer title='Stoplight Yellow' hexcode='#FAEE12' stoplightYellow />
        <ColorInnerContainer title='Stoplight Red' hexcode='#EC320D' stoplightRed />
        <ColorInnerContainer title='Strong Blue' hexcode='#3082E2' strongBlue />
        <ColorInnerContainer title='Light Blue' hexcode='#E0F3FF' lightBlue />
        <ColorInnerContainer title='Navy Blue' hexcode='#253544' navyBlue />
        <ColorInnerContainer title='Bright Blue' hexcode='#5CD0E5' brightBlue />
        <ColorInnerContainer title='Off Blue' hexcode='#333C50' offBlue />
        <ColorInnerContainer title='Dark Teal' hexcode='#1A8C87' darkTeal />
        <ColorInnerContainer title='Light Teal' hexcode='#A2DBD8' lightTeal />
        <ColorInnerContainer title='Stoplight Green' hexcode='#2ADA51' stoplightGreen />
        <ColorInnerContainer title='Jungle Green' hexcode='#75D884' jungleGreen />
        <ColorInnerContainer title='Strong Orange' hexcode='#FA4A00' strongOrange />
        <ColorInnerContainer title='Light Orange' hexcode='#FB5A14' lightOrange />
        <ColorInnerContainer title='Flamingo Pink' hexcode='#FAB3BE' flamingoPink />
      </div>

    </div>
  )
};

export default DeveloperPage;