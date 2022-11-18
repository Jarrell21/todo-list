import Project from './project';
import TodoList from './todoList';
import Task from './task';

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

  const addTask = (projectName, task) => {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).addTask(task);
    Storage.saveTodoList(todoList);
  };

  return { getTodoList, saveTodoList, addTask, addProject };
})();

export default Storage;
