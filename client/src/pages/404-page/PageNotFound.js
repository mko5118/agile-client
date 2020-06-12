import React, { } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/button/Button';

import style from './page-not-found.module.scss';

// *************************** PAGE NOT FOUND COMPONENT (404) *************************** //
const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className={style.pageNotFound}>
      
      <div className={style.textContainer}>
        <div className={style.textItems}>
          <h1 className={style.header}>Page Not Found</h1>
          <p className={style.text}>
            The page you're looking for is not available. Follow the link below to go back to the home page.
          </p>
        </div>
        {/* <Link to='/' className={style.link}>Back Home</Link> */}
        <Button onClick={() => history.push('/')} todoButton>Back Home</Button>
      </div>

    </div>
  )
};

export default PageNotFound;