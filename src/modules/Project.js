import Task from './Task'

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

    const toJSON = () => {
        return {
            projectName, tasks
        }
    }

    return {projectName, tasks, setTasks, getName, getTasks,  addTask };
};

export default project;