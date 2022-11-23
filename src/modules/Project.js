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

  const getTask = (taskTitle) =>
    tasks.find((task) => task.getTitle() === taskTitle);

  const contains = (taskTitle) =>
    tasks.some((task) => task.getTitle() === taskTitle);

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

  return {
    toJSON,
    setTasks,
    getName,
    setName,
    getTasks,
    getTask,
    contains,
    addTask,
    deleteTask,
  };
};

export default project;
