const project = (projectName) => {
    const getName = () => projectName;

    let tasks = [];

    const setTasks = (newTasks) => {
        tasks = newTasks;
    }

    const getTasks = () => tasks;

    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    return { setTasks, getName, getTasks,  addTask };
};

export default project;