import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../redux/auth/auth.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './signin-page.module.scss';

// *************************** SIGNIN PAGE COMPONENT *************************** //
const SigninPage = ({ isAuthenticated, loginUser }) => {
  const history = useHistory()
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formData.email, formData.password);
    setFormData({ email: '', password: ''});
    history.push('/dashboard');
  };

  return (
    <div className={style.signinPage}>
      
      {/* FORM SECTION */}
      <div className={style.formContainer}>
        <h2 className={style.formHeader}>Sign in to Agile Client</h2>
        <form className={style.form} onSubmit={onSubmit}>
          <div className={style.inputContainer}>
            <label className={style.inputLabel}>
              Email Address
              <span className={style.requiredText}>(required)</span>
            </label>
            <FormInput
              type='email'
              name='email'
              placeholder='Email'
              autoComplete='off'
              value={formData.email}
              onChange={onChange}
              required
              signupInput
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.inputLabel}>
              Password
              <span className={style.requiredText}>(required)</span>
            </label>
            <FormInput
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
              value={formData.password}
              onChange={onChange}
              required
              signupInput
            />
          </div>

          <Button type='submit' signupPage>Sign In</Button>

          <p className={style.haveAccountText}>
            Not registered?
            <span
              className={style.signinText}
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>

      {/* SIGN UP LANDING SECTION */}
      <div className={style.signinLandingSection}>
        <div className={style.imageContainer} />
      </div>

    </div>
  )
};

// REDUX
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);