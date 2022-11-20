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
    UI.loadProjectContent(projectName);
    console.log('this btn', projectButton);
  };

  const loadProjectContent = (projectName) => {
    const content = document.querySelector('#content');
    content.innerHTML = `
        <div id="content-title">${projectName}</div>
        <div id="content-body">
          <div class="tasks-list"></div>`;

    if (projectName !== 'Today' && projectName !== 'This week') {
      content.innerHTML += `
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

  // Content creation

  const createNewProject = (project) => {
    const container = document.querySelector('.projects-container');

    container.innerHTML += `<button id="${project}-btn" class="project-btn">${project}</button>`;

    UI.initProjectButtons();
  };

  const createNewTask = (task) => {
    const container = document.querySelector('.tasks-list');

    container.innerHTML += `
      <div class="task">
        <input type="checkbox">
        <p>${task.getTitle()}</p>
        <p>${task.getDateFormatted()}</p>
        <button>X</button>
      </div>
      `;
  };

  // Project event listeners

  const initProjectButtons = () => {
    const homeButton = document.querySelector('#home-btn');
    const todayButton = document.querySelector('#today-btn');
    const thisWeekButton = document.querySelector('#this-week-btn');
    const projectsBtn = document.querySelectorAll('.project-btn');

    projectsBtn.forEach((btn) => {
      btn.addEventListener('click', UI.handleProjectButtons);
    });
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

  const handleProjectButtons = (e) => {
    const projectName = e.target.textContent;

    UI.openProject(projectName);
  };

  const addProject = () => {
    const projectName = document.querySelector('.project-popup-input').value;
    const newProject = Project(projectName);

    Storage.addProject(newProject);
    UI.createNewProject(newProject.getName());
    UI.closeProjectPopup();
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
    const newTask = Task(taskTitle, taskDueDate);

    if (taskTitle === '' || taskDueDate === '') {
      alert('Fields must be complete');
      return;
    }

    Storage.addTask(projectName, newTask);
    UI.closeTaskPopup();
    UI.createNewTask(newTask);
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
    loadProjectContent,
    addTask,
    createNewTask,
    loadTasks,
    openTaskPopup,
    closeTaskPopup,
    openProject,
    addProject,
    createNewProject,
    loadProjects,
    openProjectPopup,
    closeProjectPopup,
    initAddTaskButtons,
    initAddProjectButtons,
    initProjectButtons,
    handleProjectButtons,
  };
})();

export default UI;
