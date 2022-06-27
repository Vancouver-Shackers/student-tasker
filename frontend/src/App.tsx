import { useEffect, useState } from "react";
import "./App.css";
import { TaskProps } from "./Components/Task";
// import Header from "./Components/Header";
import Category, { CategoryProps } from "./Components/Category";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    // UPDATES FUNCTIONS FOR ALL COMPONENTS SO THAT THE STATE IS CURRENT
    if (needsUpdate) {
      setNeedsUpdate(false);
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];

        category.addTask = (task: TaskProps) => {
          handleAddTask(i, task);
        };

        category.handleChangeTask = (taskIndex: number, newTask: TaskProps) => {
          handleChangeTask(i, taskIndex, newTask);
        };

        category.handleChangeCategory = (newCategory: string) => {
          handleChangeCategory(i, newCategory);
        };

        for (let j = 0; j < category.tasks.length; j++) {
          category.tasks[j].onChangeTask = (task: TaskProps) => {
            category.handleChangeTask(j, task);
          };
        }
      }
    }
  }, [needsUpdate]);

  const handleAddTask = (categoryIndex: number, task: TaskProps) => {
    let newCategories = [...categories];
    const targetCategory = newCategories[categoryIndex];
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
          handleAddTask(categories.length - 1, task);
        },
        handleChangeTask: (taskIndex, newTask) => {
          handleChangeTask(categories.length - 1, taskIndex, newTask);
        },
        handleChangeCategory: (newName) => {
          handleChangeCategory(categories.length - 1, newName);
        },
        categoryIndex: categories.length,
      },
    ]);
    setNeedsUpdate(true);
  };

  const handleChangeCategory = (categoryIndex: number, newName: string) => {
    let newCategories = [...categories];
    let targetCategory = newCategories[categoryIndex];
    if (targetCategory) {
      targetCategory.name = newName;
      setCategories(newCategories);
    }
    setNeedsUpdate(true);
  };

  const handleChangeTask = (
    categoryIndex: number,
    taskIndex: number,
    newTask: TaskProps
  ) => {
    let newCategories = [...categories];
    const targetCategory = newCategories[categoryIndex];
    if (targetCategory) {
      targetCategory.tasks[taskIndex] = newTask;
      setCategories(newCategories);
    }
    setNeedsUpdate(true);
  };

  const handleOnDragEnd = (result: any) => {
    if (result.reason !== "DROP" || !result.destination) {
      return;
    }

    const newCategories = [...categories];
    let from = result.source.droppableId;
    let to = result.destination.droppableId;
    let fromIndex = result.source.index;
    let toIndex = result.destination.index;

    newCategories[from].tasks = newCategories[from].tasks || [];
    newCategories[to].tasks = newCategories[to].tasks || [];
    const [removed] = newCategories[from].tasks.splice(fromIndex, 1);
    newCategories[to].tasks.splice(toIndex, 0, removed);

    setCategories(newCategories);
    setNeedsUpdate(true);
  };

  return (
    <div className="app">
      {/* Where the header will go
      <Header /> */}

      <div className="background"></div>

      {/* All task-related content */}
      <main className="taskManagerParent">
        {/* Where the task categories reside */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
        </DragDropContext>
        <button
          className="button mainBG ascend"
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
