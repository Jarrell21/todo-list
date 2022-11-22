import { format } from 'date-fns';
import Task from './task';
import Storage from './Storage';
import Project from './project';

const UI = (() => {
  const loadHomePage = () => {
    UI.loadProjects();
    UI.initAddProjectButtons();
    UI.openProject('Home', document.getElementById('home-btn'));
  };

  const openProject = (projectName, projectButton) => {
    const allButtons = document.querySelectorAll('button');

    UI.loadProjectContent(projectName);
    allButtons.forEach((button) => {
      button.classList.remove('active');
    });

    projectButton.classList.add('active');
  };

  const loadProjectContent = (projectName) => {
    const content = document.querySelector('#content');
    content.innerHTML = `
        <div id="content-title">${projectName}</div>
        <div id="content-body">
          <div class="tasks-list"></div>
        </div>`;

    const contentBody = document.querySelector('#content-body');

    if (projectName !== 'Today' && projectName !== 'This week') {
      contentBody.innerHTML += `
                <button class="add-task-btn">
                  Add Task
                </button>
                <div class="task-popup" style="display: none">
                  <input placeholder="Title" class="task-popup-title">
                  <input type="date" class="task-popup-date">
                  <div class="task-popup-btns">
                    <button class="task-popup-add-btn">
                      ADD
                    </button>
                    <button class="task-popup-cancel-btn">
                      CANCEL
                    </button>
                  </div>
                </div>`;
    }

    UI.loadTasks(projectName);
  };

  const loadProjects = () => {
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.getName() !== 'Home' &&
          project.getName() !== 'Today' &&
          project.getName() !== 'This week'
        ) {
          UI.createNewProject(project.getName());
        }
      });

    UI.initProjectButtons();
  };

  const loadHomeTasks = (e) => {
    UI.openProject('Home', e.currentTarget);
  };

  const loadTodayTasks = (e) => {
    UI.openProject('Today', e.currentTarget);
  };

  const loadThisWeekTasks = (e) => {
    UI.openProject('This week', e.currentTarget);
  };

  // Content creation

  const createNewProject = (project) => {
    const container = document.querySelector('.projects-list');

    container.innerHTML += `
    <div class="project">
      <button class="project-btn">
        <span>${project}</span>
        <span class="project-delete-btn">x</span>
      </button>
      
    </div>
    `;

    UI.initProjectButtons();
  };

  const createNewTask = (task) => {
    const tasksList = document.querySelector('.tasks-list');
    const projectName = document.querySelector('#content-title').textContent;
    const taskStatus = Storage.getTodoList()
      .getProject(projectName)
      .getTask(task.getTitle())
      .getStatus();

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    if (taskStatus === 'ongoing') {
      taskContainer.classList.remove('completed');
      taskContainer.innerHTML += `<input type="checkbox" class="task-checkbox">`;
    } else {
      taskContainer.classList.add('completed');
      taskContainer.innerHTML += `<input type="checkbox" class="task-checkbox" checked>`;
    }

    taskContainer.innerHTML += `
        <p>${task.getTitle()}</p>
        <p>${task.getDateFormatted()}</p>
        <button class="edit-task-btn">Edit</button>
        <button class="delete-task-btn">Delete</button>
      `;

    tasksList.appendChild(taskContainer);

    UI.initTaskButtons();
  };

  // Project event listeners

  const initProjectButtons = () => {
    const homeButton = document.querySelector('#home-btn');
    const todayButton = document.querySelector('#today-btn');
    const thisWeekButton = document.querySelector('#this-week-btn');
    const projectsBtn = document.querySelectorAll('.project-btn');

    homeButton.addEventListener('click', UI.loadHomeTasks);
    todayButton.addEventListener('click', UI.loadTodayTasks);
    thisWeekButton.addEventListener('click', UI.loadThisWeekTasks);

    projectsBtn.forEach((btn) => {
      btn.addEventListener('click', UI.handleProjectButtons);
    });
  };

  const handleProjectButtons = (e) => {
    const button = e.currentTarget;
    const projectName = button.children[0].textContent;

    if (e.target.classList.contains('project-delete-btn')) {
      UI.deleteProject(projectName, button);
      return;
    }

    UI.openProject(projectName, button);
  };

  const initAddProjectButtons = () => {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const projectPopupAdd = document.querySelector('.project-popup-add-btn');
    const projectPopupCancel = document.querySelector(
      '.project-popup-cancel-btn'
    );
    addProjectBtn.addEventListener('click', UI.openProjectPopup);
    projectPopupAdd.addEventListener('click', UI.addProject);

    projectPopupCancel.addEventListener('click', UI.closeProjectPopup);
  };

  const addProject = () => {
    const projectName = document.querySelector('.project-popup-input').value;
    const newProject = Project(projectName);

    Storage.addProject(newProject);
    UI.createNewProject(newProject.getName());
    UI.closeProjectPopup();
  };

  const deleteProject = (projectName, button) => {
    if (button.classList.contains('active')) {
      UI.clearProjectContent();
    }
    Storage.deleteProject(projectName);
    UI.clearProjects();
    UI.loadProjects();
  };

  const clearProjects = () => {
    const projectsList = document.querySelector('.projects-list');

    projectsList.textContent = '';
  };

  const clearProjectContent = () => {
    const content = document.querySelector('#content');

    content.textContent = '';
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

  // Task event listeners

  const initTaskButtons = () => {
    const taskCheckbox = document.querySelectorAll('.task-checkbox');
    const editTaskBtn = document.querySelectorAll('.edit-task-btn');
    const deleteTaskBtn = document.querySelectorAll('.delete-task-btn');

    taskCheckbox.forEach((checkbox) => {
      checkbox.addEventListener('change', UI.changeTaskStatus);
    });
    editTaskBtn.forEach((btn) => {
      btn.addEventListener('click', UI.editTask);
    });
    deleteTaskBtn.forEach((btn) => {
      btn.addEventListener('click', UI.deleteTask);
    });
  };

  const initAddTaskButtons = () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const popupAdd = document.querySelector('.task-popup-add-btn');
    const popupCancel = document.querySelector('.task-popup-cancel-btn');

    addTaskBtn.addEventListener('click', UI.openTaskPopup);
    popupAdd.addEventListener('click', UI.addTask);
    popupCancel.addEventListener('click', UI.closeTaskPopup);
  };

  const loadTasks = (projectName) => {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => {
        UI.createNewTask(task);
      });

    if (projectName !== 'Today' && projectName !== 'This week') {
      UI.initAddTaskButtons();
    }
  };

  const addTask = () => {
    const projectName = document.querySelector('#content-title').textContent;
    const taskTitle = document.querySelector('.task-popup-title').value;
    const taskDueDate = document.querySelector('.task-popup-date').value;
    const taskStatus = 'ongoing';
    const newTask = Task(taskTitle, taskDueDate, taskStatus);

    if (taskTitle === '' || taskDueDate === '') {
      alert('Fields must be complete');
      return;
    }

    Storage.addTask(projectName, newTask);
    UI.closeTaskPopup();
    UI.createNewTask(newTask);
  };

  const editTask = (e) => {
    const taskTitle = e.target.parentNode.children[1].textContent;
    const taskDate = e.target.parentNode.children[2].textContent;
    console.log(taskTitle);
  };

  const deleteTask = (e) => {
    const projectName = document.querySelector('#content-title').textContent;
    const taskTitle = e.target.parentNode.children[1].textContent;

    Storage.deleteTask(projectName, taskTitle);
    UI.clearTasks();
    UI.loadTasks(projectName);
  };

  const changeTaskStatus = (e) => {
    const projectName = document.querySelector('#content-title').textContent;
    const taskDiv = e.target.parentNode;
    const taskTitle = taskDiv.children[1].textContent;

    if (e.target.checked) {
      taskDiv.classList.add('completed');
      Storage.changeTaskStatus(projectName, taskTitle, 'completed');
    } else {
      taskDiv.classList.remove('completed');
      Storage.changeTaskStatus(projectName, taskTitle, 'ongoing');
    }
  };

  const clearTasks = () => {
    const tasksList = document.querySelector('.tasks-list');

    tasksList.textContent = '';
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

  return {
    loadHomePage,
    loadProjects,
    loadProjectContent,
    loadHomeTasks,
    loadTodayTasks,
    loadThisWeekTasks,
    createNewProject,
    openProject,
    addProject,
    deleteProject,
    clearProjects,
    clearProjectContent,
    openProjectPopup,
    closeProjectPopup,
    loadTasks,
    createNewTask,
    addTask,
    editTask,
    deleteTask,
    changeTaskStatus,
    clearTasks,
    openTaskPopup,
    closeTaskPopup,
    initAddTaskButtons,
    initAddProjectButtons,
    initProjectButtons,
    initTaskButtons,
    handleProjectButtons,
  };
})();

export default UI;
