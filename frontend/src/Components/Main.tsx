import { useEffect, useState } from "react";
import Category, { CategoryProps } from "./Category";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TaskProps } from "./Task";

export const Main = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    // UPDATES FUNCTIONS FOR ALL COMPONENTS SO THAT THE STATE IS CURRENT
    if (needsUpdate) {
      setNeedsUpdate(false);
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];

        category.categoryIndex = i; // doesnt even matter

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

    let newCategories = [...categories];
    let fromIndex = result.source.index;
    let toIndex = result.destination.index;
    if (result.type === "cat-drop") {
      // dropped category
      let [removed] = newCategories.splice(fromIndex, 1);
      newCategories.splice(toIndex, 0, removed);
    } else {
      // dropped task
      let from = result.source.droppableId;
      let to = result.destination.droppableId;

      newCategories[from].tasks = newCategories[from].tasks || [];
      newCategories[to].tasks = newCategories[to].tasks || [];
      const [removed] = newCategories[from].tasks.splice(fromIndex, 1);
      newCategories[to].tasks.splice(toIndex, 0, removed);
    }
    setCategories(newCategories);
    setNeedsUpdate(true);
  };

  return (
    /* All task-related content */
    <div className="taskManagerParent">
      {/* Where the task categories reside */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="app" direction="horizontal" type="cat-drop">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "flex",
              }}
            >
              {categories.map((category, index) => (
                <Draggable
                  key={index}
                  draggableId={"CAT-" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Category {...category} categoryIndex={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
    </div>
  );
};

export default Main;
