import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../../redux/auth/auth.actions';

import style from './signin-page.module.scss';

// *************************** SIGNIN PAGE COMPONENT *************************** //
const SigninPage = ({ loginUser }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password);
    setFormData({ email: '', password: ''});
  };

  return (
    <div className={style.signinPage}>

      <form className={style.form} onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={onChange}
          autoComplete='off'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={onChange}
          autoComplete='off'
        />
        <button>Sign In</button>
      </form>

    </div>
  )
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(null, mapDispatchToProps)(SigninPage);