import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getAllTasks, getTask, createTask } from '../../../redux/task/task.actions';

import style from './task-page.module.scss';

// *************************** TASK PAGE COMPONENT *************************** //
const TaskPage = ({ taskState, getAllTasks, getTask, createTask }) => {
  const { tasks, task, loading, error } = taskState;

  const [ formData, setFormData ] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    getAllTasks()
  }, [getAllTasks]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData.title, formData.body);
    setFormData({ title: '', body: '' });
  }

  return (
    <div className={style.taskPage}>
      <h2>Tasks Page</h2>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={onChange}
          required
        />
        <textarea
          type='textarea'
          name='body'
          placeholder='Body'
          value={formData.body}
          onChange={onChange}
        />
        <button type='submit'>Submit</button>
      </form>

      <h3>Current Tasks</h3>
      {
        tasks.map(task => (
          <div key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.body}</p>
            <p>{task.date_created}</p>
            <p>{task.is_complete ? 'Complete' : 'Not Complete'}</p>
            <button onClick={() => getTask(task.id)}>Click</button>
          </div>
        ))
      }
    </div>
  )
};

// REDUX
const mapStateToProps = (state) => ({
  taskState: state.task,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTasks: () => dispatch(getAllTasks()),
  getTask: (id) => dispatch(getTask(id)),
  createTask: (title, body) => dispatch(createTask(title, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);