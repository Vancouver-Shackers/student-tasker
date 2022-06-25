import Task, { TaskProps } from "./Task";

export interface CategoryProps {
  name: string;
  tasks: TaskProps[];
  handleAddTask: (task: TaskProps) => void;
  handleChangeTask: (oldTask: TaskProps, newTask: TaskProps) => void;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <h1 className="categoryHeader">{props.name}</h1>
        <div className="categoryContent">
        <button
        className="button secondaryBG ascend"
        onClick={() => {props.handleAddTask({
          // Maybe we just have default values, then make the task editable
          name: "New Task",
          description: "Task Description",
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
        })}}
        >Add task</button>
        {props.tasks.map((task, index) => {
        return (
          <Task
            key={index}
            {...task}
          />
        );
      })}
        </div>
    </div>
  );
};

export default Category;
