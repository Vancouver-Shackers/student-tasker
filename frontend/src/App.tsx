import React from "react";
import "./App.css";
import { TaskProps } from "./Components/Task";
// import Header from "./Components/Header";
import Category, { CategoryProps } from "./Components/Category";

const App = () => {
  const [categories, setCategories] = React.useState<CategoryProps[]>([
    {
      name: "Category 1",
      tasks: [{
        name: "Task 1",
        description: "Task Description that goes on and continues for many lines until there is enough content to clearly show what a task will look like",
        color: "#FF6700"
      }],
      addTask: (task: TaskProps) => {
      }
    },
    {
      name: "Category 2",
      tasks: [{
        name: "Task 1",
        description: "Description 1",
        color: "#FF6700"
      }],
      addTask: (task: TaskProps) => {
      }
    }
  ]);
  
  const addTask = (category: CategoryProps, task: TaskProps) => {
    const newCategories = [...categories];w
    const targetCategory = newCategories.find(c => c.name === category.name);
    if (targetCategory) {
      targetCategory.tasks.push(task);
    }
    setCategories(newCategories);
  }

  return (
    <div className="app">
      {/* Where the header will go
      <Header /> */}

      {/* All task-related content */}
      <main className="taskManagerParent">
        {/* Where the tasks resides */}
        {/* Task catagory */}

          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
          
      </main>
    </div>
  );
};

export default App;
