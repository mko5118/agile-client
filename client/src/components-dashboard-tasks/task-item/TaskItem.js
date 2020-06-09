import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { getTask, updateTask, deleteTask } from '../../redux/task/task.actions';
import { toggleEditTask } from '../../redux/dashboard/dashboard.actions';

import style from './task-item.module.scss';

// *************************** TASK ITEM COMPONENT *************************** //
const TaskItem = ({ task, getTask, updateTask, deleteTask, toggleEditTask }) => {
  const { id, title, body, date_created, is_complete } = task;

  useEffect(() => {
    getTask(id)
  }, [getTask, id]);
  
  const [ formData, setFormData ] = useState({
    title: title,
    body: body,
    date_created: date_created,
    is_complete: is_complete,
  });

  // Will toggle 'taskMenu.isEditing' state to render 'TaskEdit.js' component in 'TaskPage.js'
  const navigateToEditTask = async (taskId) => {
    await getTask(taskId);
    toggleEditTask();
  };

  const onChange = async () => {
    const isChecked = formData.is_complete = !formData.is_complete;
    setFormData({
      ...formData,
      is_complete: isChecked,
    });
    await updateTask(id, formData);
  };

  return (
    <div className={style.taskItem}>
      <div key={id} className={style.taskContainer}>
          <div className={style.headerContainer}>
            <h4 className={style.taskType}>{title}</h4>
          </div>
          <p className={style.taskText}>{body}</p>
          <p className={style.taskDateText}>{moment(date_created).format('MMMM Do YYYY')}</p>
          <div className={style.buttonContainer}>
            <div className={style.isCompleteContainer}>
              <input 
                type='checkbox'
                name='is_complete'
                checked={formData.is_complete}
                onChange={onChange}
                className={style.checkbox}
              />
              <label className={style.isCompleteText}>Completed</label>
            </div>
            <div className={style.iconsContainer}>
              <div className={style.editIconContainer} onClick={() => navigateToEditTask(id)}>
                <MdEdit className={style.editIcon} aria-label='Edit Task' />
                <span className={style.editText}>Edit</span>
              </div>
              <div className={style.deleteIconContainer} onClick={() => deleteTask(id)}>
                <MdDeleteForever className={style.deleteIcon} aria-label='Delete Task' />
                <span className={style.deleteText}>Delete</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
};

// PROP TYPES
TaskItem.propTypes = {
  getTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleEditTask: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  getTask: (id) => dispatch(getTask(id)),
  updateTask: (id, formData) => dispatch(updateTask(id, formData)),
  deleteTask: (id) => dispatch(deleteTask(id)),
  toggleEditTask: () => dispatch(toggleEditTask()),
});

export default connect(null, mapDispatchToProps)(TaskItem);