import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTask, updateTask, deleteTask } from '../../redux/task/task.actions';

import Button from '../../components/button/Button';

import style from './task-item.module.scss';

// *************************** TASK ITEM COMPONENT *************************** //
const TaskItem = ({ task, getTask, updateTask, deleteTask }) => {
  const { id, title, body, date_created, is_complete } = task;
  const [ editing, setEditing ] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getTask(id)
  }, [getTask, id]);

  return (
    <div className={style.taskItem}>
      <h4>{title}</h4>
      <p>{id}</p>
      <p>{body}</p>
      <p>{date_created}</p>
      <p>{is_complete ? 'Complete' : 'Not Complete'}</p>
      <Button onClick={() => getTask(id)}>Click</Button>
      <Button onClick={() => deleteTask(id)}>Delete</Button>
      <button>Edit</button>
    </div>
  )
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  getTask: (id) => dispatch(getTask(id)),
  updateTask: (id, formData) => dispatch(updateTask(id, formData)),
  deleteTask: (id) => dispatch(deleteTask(id)),
});

export default connect(null, mapDispatchToProps)(TaskItem);