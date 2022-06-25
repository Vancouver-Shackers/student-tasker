export interface TaskProps {
  name: string;
  description: string;
  /**
   * The hex code of the task color
   */
  color: string
}

const Task = (props: TaskProps) => {
  return (
    <div className="task ascend" tabIndex={0}>
      <div className="taskTopper">
        <div className={`taskColor`} style={{
          backgroundColor: props.color
        }}></div>
        
        <h2 className="taskHeader">{props.name}</h2>
      </div>
      <p className="taskDescription">{props.description}</p>
    </div>
  );
};

export default Task;
