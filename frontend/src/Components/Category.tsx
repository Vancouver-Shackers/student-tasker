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
        className="addTaskButton ascend"
        onClick={() => {
          props.tasks.push({
            name: "sdasd",
            description: "sd",
            color: ""});
          }
        }
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
  );
};

export default Category;
