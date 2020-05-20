import React, { useState, useEffect } from 'react';
import axios from 'axios';

import style from './login-page.module.scss';

// *************************** LOGIN PAGE COMPONENT *************************** //
const LoginPage = () => {
  
  useEffect(() => {
    taskEndpoint();
  }, [])

  const taskURL = 'http://localhost:8000/api/task/tasks/'

  const taskEndpoint = async () => {
    // const res = await axios.get(taskURL);  # returns 401 (UNAUTHORIZED)
    // console.log(res);
    console.log('Hello There');
  };

  return (
    <div className={style.loginPage}>
      LOG IN PAGE
    </div>
  )
};

export default LoginPage;