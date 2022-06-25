import { createRef } from "react";
import ContentEditable from "react-contenteditable";

export interface TaskProps {
  name: string;
  description: string;
  onChangeTask: (task: TaskProps) => void;
  /**
   * The hex code of the task color
   */
  color: string;
}

const Task = (props: TaskProps) => {
  const contentEditable = createRef<HTMLElement>();

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
          innerRef={contentEditable}
          html={props.name}
          disabled={false}
          onChange={(e) => {}}
          onBlur={(e) => {
            props.onChangeTask({
              ...props,
              name: e.target.innerText,
            });
          }}
          tagName="h2"
        />
      </div>
      <ContentEditable
        innerRef={contentEditable}
        html={props.description}
        disabled={false}
        onChange={(e) => {}}
        onBlur={(e) => {
          props.onChangeTask({
            ...props,
            description: e.target.innerText,
          });
        }}
        tagName="p"
      />
    </div>
  );
};

export default Task;
