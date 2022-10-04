import Task from "./task";
import Storage from "./Storage";

const UI = (() => {
    const loadHome = () => {
        loadProjectContent('Todos');
    }

    const loadToday = () => {
        loadProjectContent('Today');
    }

    const loadThisWeek = () => {
        loadProjectContent('This week');
    }

    const loadProjectContent = (project) => {
        const content = document.querySelector('#content');
        content.innerHTML = `
        <div id="content-title">${project}</div>`;

        const contentBody = document.createElement('div');
        contentBody.setAttribute('id', 'content-body');
        contentBody.appendChild(loadTasks(project));

        content.appendChild(contentBody);

        if (project === 'Todos'){
            contentBody.appendChild(addTaskButton());
            contentBody.appendChild(addTaskPopup());
        }
    }

    const addTaskButton = () => {
        const taskBtn = document.createElement('button');

        taskBtn.classList.add("add-task-btn");
        taskBtn.textContent = 'Add Task';
        taskBtn.addEventListener('click', openTaskPopup)

        return taskBtn;
    }

    const addTaskPopup = () => {
        const content = document.querySelector('#content');
        const projectName = document.querySelector('#content-title').textContent;
        const popUpContainer = document.createElement('div');
        const taskTitle = document.createElement('input');
        // const taskDescription = document.createElement('input');
        // const taskDueDate = document.createElement('input');
        // const taskPriority = document.createElement('input');
        const popUpBtns = document.createElement('div');
        const addBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        addBtn.textContent = 'ADD';
        cancelBtn.textContent = 'CANCEL';

        popUpContainer.classList.add('task-popup');
        taskTitle.classList.add('task-popup-title');
        // taskDescription.classList.add('task-popup-desc');
        // taskDueDate.classList.add('task-popup-date');
        // taskPriority.classList.add('task-popup-priority');
        popUpBtns.classList.add('task-popup-btns');
        addBtn.classList.add('task-popup-add-btn');
        cancelBtn.classList.add('task-popup-cancel-btn');
        
        addBtn.addEventListener('click', () => {
            const taskTitleVal = document.querySelector('.task-popup-title').value;
            addTask(taskTitleVal);
            closeTaskPopup()
            content.textContent = '';
            loadProjectContent(projectName);

        });
        cancelBtn.addEventListener('click', closeTaskPopup);

        popUpContainer.appendChild(taskTitle);
        // popUpContainer.appendChild(taskDescription);
        // popUpContainer.appendChild(taskDueDate);
        // popUpContainer.appendChild(taskPriority);
        popUpContainer.appendChild(popUpBtns);
        popUpBtns.appendChild(addBtn);
        popUpBtns.appendChild(cancelBtn);
        popUpContainer.style.display = 'none';

        return popUpContainer;

    }

    const openTaskPopup = () => {
        const addTaskBtn = document.querySelector('.add-task-btn');
        const popUpContainer = document.querySelector('.task-popup');

        addTaskBtn.style.display = 'none';
        popUpContainer.style.display = 'flex';
    }

    const closeTaskPopup = () => {
        const addTaskBtn = document.querySelector('.add-task-btn');
        const popUpContainer = document.querySelector('.task-popup');

        addTaskBtn.style.display = 'block';
        popUpContainer.style.display = 'none';
    }

    const openProjectPopup = () => {
        const addProjectBtn = document.querySelector('.add-project-btn');
        const popUpContainer = document.querySelector('.project-popup');

        addProjectBtn.style.display = 'none';
        popUpContainer.style.display = 'flex';
    }

    const closeProjectPopup = () => {
        const addProjectBtn = document.querySelector('.add-project-btn');
        const popUpContainer = document.querySelector('.project-popup');

        addProjectBtn.style.display = 'block';
        popUpContainer.style.display = 'none';
    }

    const addTask = (title) => {
        const task = Task(title);
        Storage.addTask('title', task.title);
    }

    const projectTasksCount = () => {

    }

    const loadTasks = (projectName) => {
        const container = document.createElement('div');
        container.classList.add(`tasks`);

        if(projectName === 'Todos'){
            container.textContent = Storage.getTasks('title');
        }
        return container;
    }

    return { loadHome, 
            loadToday, 
            loadThisWeek, 
            openProjectPopup,  
            closeProjectPopup };
})();

const todos = document.querySelector('#todos-btn');
todos.addEventListener('click', UI.loadHome);

const todayBtn = document.querySelector('#today-btn');
todayBtn.addEventListener('click', UI.loadToday);

const thisWeekBtn = document.querySelector('#this-week-btn');
thisWeekBtn.addEventListener('click', UI.loadThisWeek);

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', UI.openProjectPopup);

const projectPopupCancel = document.querySelector('.project-popup-cancel-btn');
projectPopupCancel.addEventListener('click', UI.closeProjectPopup)


export default UI;