const project = (projectName) => {
  const getName = () => projectName;

  const setName = (newName) => {
    projectName = newName;
  };

  let tasks = [];

  const setTasks = (newTasks) => {
    tasks = newTasks;
  };

  const getTasks = () => tasks;

  const addTask = (newTask) => {
    tasks.push(newTask);
  };

  const deleteTask = (taskTitle) => {
    tasks = tasks.filter((task) => task.getTitle() !== taskTitle);
  };

  const toJSON = () => ({
    projectName: getName(),
    tasks: getTasks(),
  });

  return { toJSON, setTasks, getName, setName, getTasks, addTask, deleteTask };
};

export default project;
