import Task from './task';
import Storage from './Storage';
import Project from './project';
import TodoList from './todoList';

const UI = (() => {
  const loadProjectContent = (projectName) => {
    const content = document.querySelector('#content');
    content.innerHTML = `
        <div id="content-title">${projectName}</div>
        <div id="content-body"></div>`;

    const contentBody = document.querySelector('#content-body');

    contentBody.appendChild(UI.loadTasks(projectName));

    if (projectName !== 'Today' && projectName !== 'This week') {
      contentBody.appendChild(UI.createAddTaskButton());
      contentBody.appendChild(UI.createAddTaskPopup(projectName));
    }

    UI.loadProjects();
    UI.closeProjectPopup();
  };

  const createAddTaskButton = () => {
    const taskBtn = document.createElement('button');

    taskBtn.classList.add('add-task-btn');
    taskBtn.textContent = 'Add Task';
    taskBtn.addEventListener('click', UI.openTaskPopup);

    return taskBtn;
  };

  const createAddTaskPopup = (projectName) => {
    const popUpContainer = document.createElement('div');
    const taskTitle = document.createElement('input');
    const taskDueDate = document.createElement('input');
    // const taskDescription = document.createElement('input');
    // const taskPriority = document.createElement('input');
    const popUpBtns = document.createElement('div');
    const addBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    addBtn.textContent = 'ADD';
    cancelBtn.textContent = 'CANCEL';
    taskTitle.setAttribute('placeholder', 'Title');
    taskDueDate.setAttribute('type', 'date');

    popUpContainer.classList.add('task-popup');
    taskTitle.classList.add('task-popup-title');
    taskDueDate.classList.add('task-popup-date');
    // taskDescription.classList.add('task-popup-desc');
    // taskPriority.classList.add('task-popup-priority');
    popUpBtns.classList.add('task-popup-btns');
    addBtn.classList.add('task-popup-add-btn');
    cancelBtn.classList.add('task-popup-cancel-btn');

    addBtn.addEventListener('click', () => {
      UI.addTask(projectName);
    });
    cancelBtn.addEventListener('click', UI.closeTaskPopup);

    popUpContainer.appendChild(taskTitle);
    popUpContainer.appendChild(taskDueDate);
    // popUpContainer.appendChild(taskDescription);
    // popUpContainer.appendChild(taskPriority);
    popUpContainer.appendChild(popUpBtns);
    popUpBtns.appendChild(addBtn);
    popUpBtns.appendChild(cancelBtn);
    popUpContainer.style.display = 'none';

    return popUpContainer;
  };

  const addTask = (projectName) => {
    const container = document.querySelector('.tasks');
    const taskTitle = document.querySelector('.task-popup-title').value;
    const taskDueDate = document.querySelector('.task-popup-date').value;
    const newTask = Task(taskTitle, taskDueDate);

    if (taskTitle === '' || taskDueDate === '') {
      alert('Fields must be complete');
      return;
    }

    Storage.addTask(projectName, newTask);
    UI.closeTaskPopup();
    container.appendChild(UI.createNewTask(newTask));
  };

  const createNewTask = (task) => {
    const taskDiv = document.createElement('div');
    const taskCheckbox = document.createElement('input');
    const taskTitle = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const deleteTaskBtn = document.createElement('button');

    taskDiv.classList.add('task');
    taskCheckbox.setAttribute('type', 'checkbox');
    taskTitle.textContent = task.getTitle();
    taskDueDate.textContent = task.getDateFormatted();
    deleteTaskBtn.textContent = 'X';

    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(deleteTaskBtn);

    return taskDiv;
  };

  const loadTasks = (projectName) => {
    const container = document.createElement('div');
    container.classList.add(`tasks`);

    if (localStorage.getItem('todoList') !== null) {
      Storage.getTodoList()
        .getProject(projectName)
        .getTasks()
        .forEach((task) => {
          container.appendChild(UI.createNewTask(task));
        });
    }

    return container;
  };

  const openTaskPopup = () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const popUpContainer = document.querySelector('.task-popup');

    addTaskBtn.style.display = 'none';
    popUpContainer.style.display = 'flex';
  };

  const closeTaskPopup = () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const popUpContainer = document.querySelector('.task-popup');
    const popUpInput = document.querySelectorAll('.task-popup>input');

    addTaskBtn.style.display = 'block';
    popUpContainer.style.display = 'none';
    popUpInput.forEach((input) => (input.value = null));
  };

  const addProject = () => {
    const container = document.querySelector('.projects-container');
    const projectName = document.querySelector('.project-popup-input').value;
    const newProject = Project(projectName);

    Storage.addProject(newProject);
    container.appendChild(UI.createNewProject(newProject));
    UI.closeProjectPopup();
  };

  const createNewProject = (project) => {
    const button = document.createElement('button');

    button.textContent = project.getName();
    button.classList.add('project-btn');
    button.addEventListener('click', () => {
      UI.loadProjectContent(project.getName());
    });

    return button;
  };

  const loadProjects = () => {
    const container = document.querySelector('.projects-container');

    container.textContent = '';
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.getName() !== 'Home' &&
          project.getName() !== 'Today' &&
          project.getName() !== 'This week'
        ) {
          container.appendChild(UI.createNewProject(project));
        }
      });
  };

  const openProjectPopup = () => {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const popUpContainer = document.querySelector('.project-popup');

    addProjectBtn.style.display = 'none';
    popUpContainer.style.display = 'flex';
  };

  const closeProjectPopup = () => {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const popUpContainer = document.querySelector('.project-popup');
    const popUpInput = document.querySelector('.project-popup-input');

    addProjectBtn.style.display = 'block';
    popUpContainer.style.display = 'none';
    popUpInput.value = '';
  };

  return {
    loadProjectContent,
    createAddTaskButton,
    createAddTaskPopup,
    addTask,
    createNewTask,
    loadTasks,
    openTaskPopup,
    closeTaskPopup,
    addProject,
    createNewProject,
    loadProjects,
    openProjectPopup,
    closeProjectPopup,
  };
})();

const projectBtn = document.querySelectorAll('.project-btn');
projectBtn.forEach((btn) => {
  const projectName = btn.textContent;
  btn.addEventListener('click', () => {
    UI.loadProjectContent(projectName);
  });
});

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', UI.openProjectPopup);

const projectPopupAdd = document.querySelector('.project-popup-add-btn');
projectPopupAdd.addEventListener('click', UI.addProject);

const projectPopupCancel = document.querySelector('.project-popup-cancel-btn');
projectPopupCancel.addEventListener('click', UI.closeProjectPopup);

export default UI;
