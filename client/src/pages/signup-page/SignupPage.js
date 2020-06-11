import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/auth/auth.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './signup-page.module.scss';

// *************************** SIGN UP PAGE COMPONENT *************************** //
const SignupPage = ({ registerUser }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = formData;

  const history = useHistory();

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
    history.push('/dashboard');
  };

  return (
    <div className={style.signupPage}>
      
      {/* SIGN UP LANDING SECTION */}
      <div className={style.signupLandingSection}>
        <div className={style.imageContainer} />
      </div>
      
      {/* FORM SECTION */}
      <div className={style.formContainer}>
        <h2 className={style.formHeader}>Sign up to Agile Client</h2>
        <form className={style.form} onSubmit={onSubmit}>
          <div className={style.inputContainer}>
            <label className={style.inputLabel}>
              Username
              <span className={style.requiredText}>(required)</span>
            </label>
            <FormInput
              type='text'
              name='name'
              placeholder='Username'
              autoComplete='off'
              value={name}
              onChange={onChange}
              required
              signupInput
            />
          </div>
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
              value={email}
              onChange={onChange}
              required
              signupInput
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.inputLabel}>
              Password
              <span className={style.requiredText}>(6+ characters)</span>
            </label>
            <FormInput
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
              value={password}
              onChange={onChange}
              required
              signupInput
            />
          </div>

          <div className={style.termsAndConditionsContainer}>
            <p className={style.termsAndConditionsText}>
              Creating an account means you're okay with our Terms of Service and Privacy Policy.
            </p>
          </div>

          <Button type='submit' signupPage>Create Account</Button>

          <p className={style.haveAccountText}>
            Already a User?
            <span
              className={style.signinText}
              onClick={() => history.push('/signin')}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>

    </div>
  )
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  registerUser: ({email, password, name}) => dispatch(registerUser({email, password, name})),
});

export default connect(null, mapDispatchToProps)(SignupPage);