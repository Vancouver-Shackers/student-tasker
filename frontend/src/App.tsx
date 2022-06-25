import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskProps } from "./Components/Task";
// import Header from "./Components/Header";
import Category, { CategoryProps } from "./Components/Category";

const App = () => {
  const [categories, setCategories] = React.useState<CategoryProps[]>([
    {
      name: "Category 1",
      tasks: [
        {
          name: "Task 1",
          description:
            "Task Description that goes on and continues for many lines until there is enough content to clearly show what a task will look like",
          color: "#FF6700",
        },
      ],
      addTask: (task: TaskProps) => {
        addTask("Category 1", task);
      },
    },
    {
      name: "Category 2",
      tasks: [
        {
          name: "Task 1",
          description: "Description 1",
          color: "#FF6700",
        },
      ],
      addTask: (task: TaskProps) => {
        addTask("Category 2", task);
      },
    },
  ]);

  // need this to know when to update addTask's state
  const [needsUpdate, setNeedsUpdate] = React.useState(false);

  useEffect(() => {
    if (needsUpdate) {
      setNeedsUpdate(false);
      for (let category of categories) {
        category.addTask = (task: TaskProps) => {
          addTask(category.name, task);
        };
      }
    }
  }, [needsUpdate]);

  const addTask = (categoryName: string, task: TaskProps) => {
    let newCategories = [...categories];
    const targetCategory = newCategories.find((c) => c.name === categoryName);
    if (targetCategory) {
      targetCategory.tasks.splice(0, 0, task);
      setCategories(newCategories);
    }
  };

  const addCategory = (name: string) => {
    setNeedsUpdate(true);
    setCategories([
      ...categories,
      {
        name: name,
        tasks: [],
        addTask: (task: TaskProps) => {
          addTask(name, task);
        },
      },
    ]);
  };

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
        <button
          className="button secondaryBG ascend"
          // TEMPORARY STYLING
          style={{
            margin: "10px",
            width: "200px",
            height: "50px",
          }}
          onClick={() => {
            addCategory("Category " + (categories.length + 1));
          }}
        >
          Add Category
        </button>
      </main>
    </div>
  );
};

export default App;
