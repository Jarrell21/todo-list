import Task from './Task'

const project = (projectName) => {
    const getName = () => projectName;

    let tasks = [Task('wow'), Task('no')];

    const setTasks = (newTasks) => {
        tasks = newTasks;
    }

    const getTasks = () => tasks;

    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    const toJSON = () => getName();

    return { setTasks, getName, getTasks,  addTask, toJSON };
};

export default project;