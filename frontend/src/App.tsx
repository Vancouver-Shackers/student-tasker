import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskProps } from "./Components/Task";
// import Header from "./Components/Header";
import Category, { CategoryProps } from "./Components/Category";

const App = () => {
  const [categories, setCategories] = React.useState<CategoryProps[]>([
    // {
    //   name: "Category 1",
    //   tasks: [
    //     {
    //       name: "Task 1",
    //       description:
    //         "Task Description that goes on and continues for many lines until there is enough content to clearly show what a task will look like",
    //       color: "#FF6700",
    //     },
    //   ],
    //   handleAddTask: (task: TaskProps) => {
    //     handleAddTask("Category 1", task);
    //   },
    // },
    // {
    //   name: "Category 2",
    //   tasks: [
    //     {
    //       name: "Task 1",
    //       description: "Description 1",
    //       color: "#FF6700",
    //     },
    //   ],
    //   handleAddTask: (task: TaskProps) => {
    //     handleAddTask("Category 2", task);
    //   },
    // },
  ]);

  // need this to know when to update addTask's state
  const [needsUpdate, setNeedsUpdate] = React.useState(false);

  useEffect(() => {
    if (needsUpdate) {
      setNeedsUpdate(false);
      for (let category of categories) {
        category.handleAddTask = (task: TaskProps) => {
          handleAddTask(category.name, task);
        };
      }
    }
  }, [needsUpdate]);

  const handleChangeTask = (categoryName: string, oldTask: TaskProps, newTask: TaskProps) => {
    let newCategories = [...categories];
    let targetCategory = newCategories.find((c) => c.name === categoryName);
    if (targetCategory) {
      let task = targetCategory.tasks.find((t) => t === oldTask);
      if (task) {
        task = newTask;
        setCategories(newCategories);
      }
    }
  }

  const handleAddTask = (categoryName: string, task: TaskProps) => {
    let newCategories = [...categories];
    const targetCategory = newCategories.find((c) => c.name === categoryName);
    if (targetCategory) {
      targetCategory.tasks.splice(0, 0, task);
      setCategories(newCategories);
    }
  };

  const handleAddCategory = (name: string) => {
    setNeedsUpdate(true);
    setCategories([
      ...categories,
      {
        name: name,
        tasks: [],
        handleAddTask: (task: TaskProps) => {
          handleAddTask(name, task);
        },
        handleChangeTask: (oldTask: TaskProps, newTask: TaskProps) => {
          handleChangeTask(name, oldTask, newTask);
        }
      },
    ]);
  };

  return (
    <div className="app">
      {/* Where the header will go
      <Header /> */}

      <div className="background"></div>

      {/* All task-related content */}
      <main className="taskManagerParent">
        {/* Where the tasks resides */}


        {/* Task catagory */}

        {categories.map((category, index) => (
          <Category key={index} {...category} />
        ))}
        <button
          className="button secondaryBG ascend"
          // TEMPORARY STYLING
          style={{
            width: "200px",
            height: "50px",
          }}
          onClick={() => {
            handleAddCategory("Category " + (categories.length + 1));
          }}
        >
          Add category
        </button>

      </main>
      </div>
  );
};

export default App;
