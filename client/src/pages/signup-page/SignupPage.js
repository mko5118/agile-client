import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../redux/alert/alert.actions';
import { registerUser } from '../../redux/auth/auth.actions';

import style from './signup-page.module.scss';

// *************************** SIGN UP PAGE COMPONENT *************************** //
const SignupPage = ({ setAlert, registerUser }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser({ email, password, name });
    setFormData({email: '', password: '', name: ''});
  };

  return (
    <div className={style.signupPage}>
      
      <h3>Sign Up Page</h3>
      
      <form className={style.form} onSubmit={onSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='off'
          value={email}
          onChange={onChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          value={password}
          onChange={onChange}
          required
        />
        <input
          type='text'
          name='name'
          placeholder='Name'
          autoComplete='off'
          value={name}
          onChange={onChange}
          required
        />
        <button>Sign Up</button>
      </form>

    </div>
  )
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  setAlert: (msg, alertType, timeout) => dispatch(setAlert(msg, alertType, timeout)),
  registerUser: ({email, password, name}) => dispatch(registerUser({email, password, name})),
});

export default connect(null, mapDispatchToProps)(SignupPage);