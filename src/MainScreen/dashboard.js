import React, { useState, useReducer } from "react";
import { withRouter, Link } from "react-router-dom";
import ToDoContainer from "./ToDoContainer";
import DoneContainer from "./DoneContainer";
import styles from "./styles.scss";

const TaskContext = React.createContext({});

//reducer for tasks Management
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const taskIndex = state.tasksAdded.findIndex(data => data.taskName === action.payload.taskName);
      if (taskIndex === -1) {
        return {
          ...state,
          tasksAdded: [...state.tasksAdded, action.payload]
        };
      } else {
        alert("Task with this name already Added");
      }

    case "TASK_DONE":
      return {
        ...state,
        tasksDone: [...state.tasksDone, action.payload]
      };

    case "EDIT_SAVE":
      const previousTaskIndex = state.tasksAdded.findIndex(data => data.taskName === action.payload.previous.taskName);
      state.tasksAdded.splice(previousTaskIndex, 1, action.payload.new);
      return {
        ...state
      };
    case "REMOVE_TASK":
      const tasksAfterRemoved = state.tasksAdded.filter(data => data.taskName !== action.payload.taskName);
      return {
        ...state,
        tasksAdded: [...tasksAfterRemoved]
      };
    default:
      return state;
  }
};

const Dashboard = props => {
  const [inputTask, setInputTask] = useState({});
  const [listViewState, setListView] = useState({ listView: false });

  const [tasks, dispatch] = useReducer(taskReducer, { tasksAdded: [], tasksDone: [] });

  const handleChange = event => {
    event.preventDefault();
    const Task = {
      taskName: event.target.value,
      description: "a small description about task ..."
    };
    setInputTask({ ...Task });
  };

  const handleSave = (previousTask, newTask) => {
    event.preventDefault();
    return dispatch({ type: "EDIT_SAVE", payload: { new: newTask, previous: previousTask } });
  };

  const handleListView = () => {
    event.preventDefault();
    setListView({ ...listViewState, listView: !listViewState.listView });
  };

  const markTaskDone = taskObj => {
    event.preventDefault();
    return dispatch({ type: "TASK_DONE", payload: taskObj }), dispatch({ type: "REMOVE_TASK", payload: taskObj });
  };
  return (
    <TaskContext.Provider value={tasks}>
      <section className={styles.dashboardContainer}>
        <button className={styles.btnLogout} onClick={event => props.handleLogout(props.history)}>
          Logout
        </button>
        <ToDoContainer
          inputTask={inputTask}
          dispatch={dispatch}
          taskState={tasks.tasksAdded}
          handleListView={handleListView}
          handleChange={handleChange}
          handleSave={handleSave}
          markTaskDone={markTaskDone}
          listViewState={listViewState}
        />
        <DoneContainer tasksDone={tasks.tasksDone} />
      </section>
    </TaskContext.Provider>
  );
};

export default withRouter(Dashboard);
