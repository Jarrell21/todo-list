import Project from "./Project";
const todoList = () => {
    let projects = [];

    projects.push(Project('Todos'));
    projects.push(Project('Today'));
    projects.push(Project('This week'));

    const setProjects = (newProjects) => {
        projects = newProjects
    }

    const getProjects = () => projects;

    const getProject = (projectName) => {
        return projects.find((project) => project.getName() === projectName);
    }

    const addProject = (projectName) => {
        projects.push(projectName);
    }

    return { getProjects, getProject, addProject, setProjects }
};

export default todoList