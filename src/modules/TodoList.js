import Project from "./project";
const todoList = () => {
    let projects = [];

    projects.push(Project('Home'));
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

    const toJSON = () => {
        return {
            projects: getProjects()
        };
    }

    return { toJSON, getProjects, getProject, addProject, setProjects }
};

export default todoList