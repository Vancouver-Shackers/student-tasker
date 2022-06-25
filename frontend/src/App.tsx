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
        addTask("Category 1", task);
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
        addTask("Category 2", task);
      }
    }
  ])

  const addCategory = (category: CategoryProps) => {
    setCategories([...categories, category])
  }
  
  const addTask = (categoryName: string, task: TaskProps) => {
    const newCategories = [...categories]
    const targetCategory = newCategories.find(c => c.name === categoryName)
    if (targetCategory) {
      targetCategory.tasks.push(task)
      setCategories(newCategories)
    }
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
