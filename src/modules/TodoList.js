import Project from './Project';
import Storage from './Storage';
import Task from './Task';

const todoList = () => {
  let projects = [];

  projects.push(Project('Home'));
  projects.push(Project('Today'));
  projects.push(Project('This week'));

  const setProjects = (newProjects) => {
    projects = newProjects;
  };

  const getProjects = () => projects;

  const getProject = (projectName) =>
    projects.find((project) => project.getName() === projectName);

  const contains = (projectName) =>
    projects.some((project) => project.getName() === projectName);

  const addProject = (projectName) => {
    projects.push(projectName);
  };

  const deleteProject = (projectName) => {
    projects = projects.filter((project) => project.getName() !== projectName);
  };

  const updateTodayProject = () => {
    getProject('Today').setTasks([]);

    projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return;

      const todayTasks = project.getTasksToday();
      todayTasks.forEach((task) => {
        const taskName = `${task.getTitle()} (${project.getName()})`;
        getProject('Today').addTask(
          Task(taskName, task.getDate(), task.getStatus())
        );
      });
    });
  };

  const updateThisWeekProject = () => {
    getProject('This week').setTasks([]);

    projects.forEach((project) => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return;

      const thisWeekTasks = project.getTasksThisWeek();
      thisWeekTasks.forEach((task) => {
        const taskName = `${task.getTitle()} (${project.getName()})`;
        getProject('This week').addTask(
          Task(taskName, task.getDate(), task.getStatus())
        );
      });
    });
  };

  const toJSON = () => ({
    projects: getProjects(),
  });

  return {
    toJSON,
    getProjects,
    getProject,
    contains,
    addProject,
    setProjects,
    deleteProject,
    updateTodayProject,
    updateThisWeekProject,
  };
};

export default todoList;
