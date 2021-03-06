import React from "react";
import { withRouter } from "react-router-dom";
import ViewWindowPanel from "./listViewWindow";
import TaskItem from "./taskItem";

import styles from "./styles.scss";

const ToDoContainer = ({ taskState, listViewState, dispatch, handleChange, handleListView, handleSave, markTaskDone, inputTask }) => {
  return (
    <div className={styles.todoContainer}>
      <h1>TO DO</h1>
      <ol>
        {taskState.length > 0 &&
          taskState.map((taskObj, i) => (
            <TaskItem
              key={i}
              handleChange={handleChange}
              handleRemoveTask={() => dispatch({ type: "REMOVE_TASK", payload: taskObj })}
              handleSave={handleSave}
              taskObj={taskObj}
              markTaskDone={markTaskDone}
              inputTask={inputTask}
            />
          ))}
      </ol>
      <input type='text' name='taskName' placeholder='Enter task title name ...' defaultValue={""} onChange={handleChange} />
      <button onClick={() => dispatch({ type: "ADD_TASK", payload: inputTask })}>+ Add a task</button>
      <button onClick={handleListView}>{!listViewState.listView ? "View list" : "close list"}</button>
      {listViewState.listView && <ViewWindowPanel taskState={taskState} />}
    </div>
  );
};

export default withRouter(ToDoContainer);
