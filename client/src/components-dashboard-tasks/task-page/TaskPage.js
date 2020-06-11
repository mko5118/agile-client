import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllTasks } from '../../redux/task/task.actions';

import TaskItem from '../task-item/TaskItem';
import TaskEdit from '../task-edit/TaskEdit';

import style from './task-page.module.scss';

// *************************** TASK PAGE COMPONENT *************************** //
const TaskPage = ({ taskState, editingTask, getAllTasks }) => {
  const { tasks, task, loading, error } = taskState;

  useEffect(() => {
    getAllTasks()
  }, [getAllTasks]);

  let renderTaskToPage = (
    <>
      <div className={style.pendingTodoContainer}>
        { tasks.length > 0 
          ? <h3 className={style.sectionTitle}>Current Todos</h3>
          : <h3 className={style.emptyTitle}>Todo List currently empty.</h3>
        }
        {/* ONLY SHOW TASKS WHICH HAVE NOT BEEN COMPLETED */}
        {
          tasks.map(task => (
            !task.is_complete && <TaskItem key={task.id} task={task} />
          ))
        }
      </div>
    
      {
        tasks.length > 0 &&
        <div className={style.completedTodoContainer}>
          <h3 className={style.sectionTitle}>Recently Completed Todos</h3>
          {/* ONLY SHOW TASKS WHICH HAVE BEEN COMPLETED */}
          { tasks.map(task => (
            task.is_complete && <TaskItem key={task.id} task={task} />
          ))}
        </div>
      }
    </>
  );

  if (editingTask) {
    renderTaskToPage = <TaskEdit />
  };

  return (
    <div className={style.taskPage}>
      <h2 className={style.header}>To Do List</h2>
      { loading ? <p>Loading...</p> : renderTaskToPage }
    </div>
  )
};

// PROP TYPES
TaskPage.propTypes = {
  taskState: PropTypes.object,
  editingTask: PropTypes.bool.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  taskState: state.task,
  editingTask: state.dashboard.editingTask,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTasks: () => dispatch(getAllTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);