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
    const projectName = document.querySelector('#content-title').textContent;
    const tasksList = document.querySelector('.tasks-list');
    const taskContainer = document.createElement('div');
    const editTaskPopup = document.createElement('div');
    const taskStatus = Storage.getTodoList()
      .getProject(projectName)
      .getTask(task.getTitle())
      .getStatus();

    taskContainer.classList.add('task');

    if (taskStatus === 'ongoing') {
      taskContainer.classList.remove('completed');
      taskContainer.innerHTML += `<input type="checkbox" class="task-checkbox">`;
    } else {
      taskContainer.classList.add('completed');
      taskContainer.innerHTML += `<input type="checkbox" class="task-checkbox" checked>`;
    }

    taskContainer.innerHTML += `
        <p class="task-title">${task.getTitle()}</p>
        <p class="task-due-date">${task.getDateFormatted()}</p>
        <button class="edit-task-btn">Edit</button>
        <button class="delete-task-btn">Delete</button>
      `;

    editTaskPopup.classList.add('edit-task-popup');
    editTaskPopup.innerHTML += `
      <input type="text" value="${task.getTitle()}" class="edit-task-task-title">
      <input type="date" value="${task.getDate()}" class="edit-task-task-due-date">
      <div class="edit-task-popup-buttons">
        <button class="edit-task-save-btn">Save</button>
        <button class="edit-task-cancel-btn">Cancel</button>
      </div>
    `;

    taskContainer.appendChild(editTaskPopup);
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
    button.parentNode.remove();
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
      btn.addEventListener('click', UI.openEditTaskPopup);
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
    const projectName = document.querySelector('#content-title').textContent;
    const editTaskPopup = e.target.parentNode.parentNode;
    const taskContainerChildren = editTaskPopup.parentNode.children;
    const oldTaskTitle = taskContainerChildren[1].textContent;
    const newTaskTitle = editTaskPopup.children[0].value;
    const newTaskDueDate = editTaskPopup.children[1].value;

    Storage.setTask(projectName, oldTaskTitle, newTaskTitle, newTaskDueDate);
    UI.closeEditTaskPopup();
    UI.clearTasks();
    UI.loadTasks(projectName);
    // UI.updateTask(projectName, newTaskTitle, newTaskDueDate);
  };

  const openEditTaskPopup = (e) => {
    const taskContainerChildren = [...e.target.parentNode.children];
    const editTaskPopup = taskContainerChildren.find((child) =>
      child.classList.contains('edit-task-popup')
    );
    const editTaskPopupButtons = [...editTaskPopup.children].find((child) =>
      child.classList.contains('edit-task-popup-buttons')
    );
    const editTaskPopupSaveBtn = [...editTaskPopupButtons.children].find(
      (child) => child.classList.contains('edit-task-save-btn')
    );
    const editTaskPopupCancelBtn = [...editTaskPopupButtons.children].find(
      (child) => child.classList.contains('edit-task-cancel-btn')
    );

    taskContainerChildren.forEach((child) => {
      if (child !== editTaskPopup) {
        child.style.display = 'none';
      }
    });

    editTaskPopup.style.display = 'flex';

    editTaskPopupCancelBtn.addEventListener('click', UI.closeEditTaskPopup);
    editTaskPopupSaveBtn.addEventListener('click', UI.editTask);
    UI.hideTaskButtons();
  };

  const closeEditTaskPopup = () => {
    const taskContainerChildren = document.querySelectorAll('.task');

    taskContainerChildren.forEach((task) => {
      [...task.children].forEach((child) => {
        if (!child.classList.contains('edit-task-popup')) {
          child.style.display = '';
        } else {
          child.style.display = 'none';
        }
      });
    });

    UI.showTaskButtons();
  };

  const hideTaskButtons = () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const allEditButtons = document.querySelectorAll('.edit-task-btn');
    const allDeleteButtons = document.querySelectorAll('.delete-task-btn');

    addTaskBtn.style.display = 'none';

    allEditButtons.forEach((btn) => {
      btn.style.display = 'none';
    });

    allDeleteButtons.forEach((btn) => {
      btn.style.display = 'none';
    });
  };

  const showTaskButtons = () => {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const allEditButtons = document.querySelectorAll('.edit-task-btn');
    const allDeleteButtons = document.querySelectorAll('.delete-task-btn');

    addTaskBtn.style.display = '';

    allEditButtons.forEach((btn) => {
      btn.style.display = '';
    });

    allDeleteButtons.forEach((btn) => {
      btn.style.display = '';
    });
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
    openEditTaskPopup,
    closeEditTaskPopup,
    hideTaskButtons,
    showTaskButtons,
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
