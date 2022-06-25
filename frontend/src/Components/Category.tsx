import Task, { TaskProps } from "./Task";

export interface CategoryProps {
  name: string;
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <h1 className="categoryHeader">{props.name}</h1>
      <button
        className="button secondaryBG ascend"
        onClick={() => {props.addTask({
          // Maybe we just have default values, then make the task editable
          name: "New Task",
          description: "Task Description",
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
        })}}
        >Add task</button>
      {props.tasks.map((task, index) => {
        return <Task key={index} {...task} />;
      })}
    </div>
  );
};

export default Category;
