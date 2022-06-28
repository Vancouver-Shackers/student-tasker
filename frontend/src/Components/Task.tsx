import { createRef } from "react";
import ContentEditable from "react-contenteditable";

export interface TaskProps {
  name: string;
  description: string;
  handleChangeTask: (task: TaskProps) => void;
  handleDeleteTask: () => void;
  /**
   * The hex code of the task color
   */
  color: string;
}

const Task = (props: TaskProps) => {
  return (
    <div className="task ascend" tabIndex={0}>
      <div className="taskTopper">
        <div
          className={`taskColor`}
          style={{
            backgroundColor: props.color,
          }}
        />
        <ContentEditable
          innerRef={createRef()}
          html={props.name}
          disabled={false}
          onChange={() => {}}
          onBlur={(e) => {
            props.handleChangeTask({
              ...props,
              name: e.target.innerText,
            });
          }}
          tagName="h2"
          className="taskHeader"
        />
        <button className="taskDeleteButton" onClick={props.handleDeleteTask}>
          x
        </button>
      </div>
      <ContentEditable
        placeholder="Description"
        innerRef={createRef()}
        html={props.description}
        disabled={false}
        onChange={(e) => {}}
        onBlur={(e) => {
          props.handleChangeTask({
            ...props,
            description: e.target.innerText,
          });
        }}
        tagName="pre" // includes linebreaks
        className="taskDescription"
      />
    </div>
  );
};

export default Task;
