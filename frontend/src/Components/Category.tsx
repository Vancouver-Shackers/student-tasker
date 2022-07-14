import { createRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ContentEditable from "react-contenteditable";
import Task, { TaskProps } from "./Task";

export interface CategoryProps {
  name: string;
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  handleChangeTask: (taskIndex: number, newTask: TaskProps) => void;
  handleChangeCategory: (newCategory: string) => void;
  handleDeleteTask: (taskIndex: number) => void;
  handleDeleteCategory: () => void;
  categoryIndex: number;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <div className="categoryTopper">
        <span
          className="material-icons-outlined redButton"
          onClick={props.handleDeleteCategory}
        >
          cancel
        </span>
        <ContentEditable
          className="categoryHeader headerMid"
          innerRef={createRef()}
          html={props.name}
          disabled={false}
          onChange={(e) => {}}
          onBlur={(e) => {
            props.handleChangeCategory(e.target.innerText);
          }}
          tagName="h1"
        />
      </div>

      <div className="categoryContent">
        <button
          className="button secondaryBG ascend"
          onClick={() => {
            props.addTask({
              // Maybe we just have default values, then make the task editable
              name: `Task ${props.tasks.length + 1}`,
              description: "Description",
              color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)})`,
              handleChangeTask: (task) => {
                props.handleChangeTask(0, task);
              },
              handleDeleteTask: () => {
                props.handleDeleteTask(0);
              },
            });
          }}
        >
          Add task
        </button>
        <Droppable droppableId={props.categoryIndex.toString()}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.tasks?.map((task, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={
                      index.toString() + "-cat" + props.categoryIndex.toString()
                    }
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task key={index} {...task} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Category;
