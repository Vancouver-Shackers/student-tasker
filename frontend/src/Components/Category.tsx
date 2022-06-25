import { createRef } from "react";
import ContentEditable from "react-contenteditable";
import Task, { TaskProps } from "./Task";

export interface CategoryProps {
  name: string;
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  handleChangeTask: (taskIndex: number, newTask: TaskProps) => void;
  handleChangeCategory: (newCategory: string) => void;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <ContentEditable
        className="categoryHeader"
        innerRef={createRef()}
        html={props.name}
        disabled={false}
        onChange={(e) => {}}
        onBlur={(e) => {
          props.handleChangeCategory(e.target.innerText);
        }}
        tagName="h1"
      />

      <div className="categoryContent">
        <button
          className="button secondaryBG ascend"
          onClick={() => {
            props.addTask({
              // Maybe we just have default values, then make the task editable
              name: "New Task",
              description: "Task Description",
              color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)})`,
              onChangeTask: (task) => {
                props.handleChangeTask(0, task);
              },
            });
          }}
        >
          Add task
        </button>
        {props.tasks.map((task, index) => {
          return <Task key={index} {...task} />;
        })}
      </div>
    </div>
  );
};

export default Category;
