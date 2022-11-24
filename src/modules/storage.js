import Project from './Project';
import TodoList from './TodoList';
import Task from './Task';

const Storage = (() => {
  const saveTodoList = (data) => {
    localStorage.setItem('todoList', JSON.stringify(data));
  };

  const getTodoList = () => {
    const todoList = Object.assign(
      TodoList(),
      JSON.parse(localStorage.getItem('todoList'))
    );

    if (localStorage.getItem('todoList') !== null) {
      todoList.setProjects(
        todoList.projects.map((project) => Object.assign(Project(), project))
      );

      todoList
        .getProjects()
        .forEach((project) => project.setName(project.projectName));

      todoList.getProjects().forEach((project) => {
        project.setTasks(
          project.tasks.map((task) => Object.assign(Task(), task))
        );
      });

      todoList.getProjects().forEach((project) => {
        project.getTasks().forEach((task) => {
          task.setTitle(task.title);
          task.setDate(task.dueDate);
          task.setStatus(task.status);
        });
      });
    } else {
      todoList.setProjects(
        todoList
          .getProjects()
          .map((project) => Object.assign(Project(), project))
      );

      todoList
        .getProjects()
        .forEach((project) =>
          project.setTasks(
            project.getTasks().map((task) => Object.assign(Task(), task))
          )
        );
    }
    return todoList;
  };

  const addProject = (project) => {
    const todoList = Storage.getTodoList();
    todoList.addProject(project);
    Storage.saveTodoList(todoList);
  };

  const deleteProject = (projectName) => {
    const todoList = Storage.getTodoList();
    todoList.deleteProject(projectName);
    Storage.saveTodoList(todoList);
  };

  const addTask = (projectName, task) => {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).addTask(task);
    Storage.saveTodoList(todoList);
  };

  const setTask = (projectName, taskName, newTaskName, newTaskDueDate) => {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).getTask(taskName).setDate(newTaskDueDate);
    todoList.getProject(projectName).getTask(taskName).setTitle(newTaskName);
    Storage.saveTodoList(todoList);
  };

  const changeTaskStatus = (projectName, taskName, status) => {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).getTask(taskName).setStatus(status);
    Storage.saveTodoList(todoList);
  };

  const deleteTask = (projectName, taskName) => {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).deleteTask(taskName);
    Storage.saveTodoList(todoList);
  };

  return {
    getTodoList,
    saveTodoList,
    addTask,
    addProject,
    setTask,
    changeTaskStatus,
    deleteProject,
    deleteTask,
  };
})();

export default Storage;
