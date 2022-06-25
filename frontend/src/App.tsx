import { useEffect, useState } from "react";
import "./App.css";
import { TaskProps } from "./Components/Task";
// import Header from "./Components/Header";
import Category, { CategoryProps } from "./Components/Category";

const App = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  // need this to know when to update addTask's state
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (needsUpdate) {
      setNeedsUpdate(false);
      for (let category of categories) {
        category.addTask = (task: TaskProps) => {
          handleAddTask(category.name, task);
        };

        category.handleChangeTask = (taskIndex: number, newTask: TaskProps) => {
          handleChangeTask(category.name, taskIndex, newTask);
        };
        for (let i = 0; i < category.tasks.length; i++) {
          category.tasks[i].onChangeTask = (task: TaskProps) => {
            category.handleChangeTask(i, task);
          };
        }
      }
    }
  }, [needsUpdate]);

  const handleAddTask = (categoryName: string, task: TaskProps) => {
    let newCategories = [...categories];
    const targetCategory = newCategories.find((c) => c.name === categoryName);
    if (targetCategory) {
      targetCategory.tasks.splice(0, 0, task);
      setCategories(newCategories);
    }
    setNeedsUpdate(true);
  };

  const addCategory = (name: string) => {
    setCategories([
      ...categories,
      {
        name: name,
        tasks: [],
        addTask: (task: TaskProps) => {
          handleAddTask(name, task);
        },
        handleChangeTask: (taskIndex, newTask) => {
          handleChangeTask(name, taskIndex, newTask);
        },
      },
    ]);
    setNeedsUpdate(true);
  };

  const handleChangeTask = (
    categoryName: string,
    taskIndex: number,
    newTask: TaskProps
  ) => {
    let newCategories = [...categories];
    const targetCategory = newCategories.find((c) => c.name === categoryName);
    if (targetCategory) {
      targetCategory.tasks[taskIndex] = newTask;
      setCategories(newCategories);
    }
    setNeedsUpdate(true);
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
            addCategory("Category " + (categories.length + 1));
          }}
        >
          Add category
        </button>

      </main>
      </div>
  );
};

export default App;
