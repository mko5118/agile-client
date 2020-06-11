import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdTitle } from 'react-icons/md';

import { createTask } from '../../redux/task/task.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';
import FormTextArea from '../../components/form-text-area/FormTextArea';

import style from './task-create.module.scss';

// *************************** TASK CREATE COMPONENT *************************** //
const TaskCreate = ({ createTask }) => {
  
  const [ formData, setFormData ] = useState({
    title: '',
    body: '',
    date_created: '',
    is_complete: false,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData.title, formData.body, formData.is_complete);
    setFormData({
      title: '',
      body: '',
      date_create: '',
      is_complete: false,
    });
  };

  return (
    <div className={style.taskCreate}>
      
      {/* HEADER SECTION */}
      <div className={style.header}>
        <h2 className={style.title}>Create Task</h2>
      </div>

      {/* CREATE TASK FORM */}
      <form className={style.form} onSubmit={onSubmit}>
        <label className={style.formLabel}>
          Title <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdTitle className={style.inputIcon} />
          <FormInput 
            type='text'
            name='title'
            placeholder='Title'
            autoComplete='off'
            value={formData.title}
            onChange={onChange}
            required
            clientInput
          />
        </div>

        <label className={style.formLabel}>Body</label>
        <FormTextArea 
          type='textarea'
          name='body'
          placeholder='Body'
          autoComplete='off'
          value={formData.body}
          onChange={onChange}
          // className={style.textArea}
          clientTextArea
        />

        {/* <Button type='submit' todoButton>Add Task</Button> */}
        <Button type='submit' clientButton>Add Task</Button>
      </form>

    </div>
  );
};

// PROP TYPES
TaskCreate.propTypes = {
  createTask: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  createTask: (title, body, is_complete) => dispatch(createTask(title, body, is_complete)),
});

export default connect(null, mapDispatchToProps)(TaskCreate);