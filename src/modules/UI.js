const UI = (() => {
    const loadHome = () => {
        UI.loadProjectContent('Todos');
        const contentBody = document.querySelector('#content-body');
        contentBody.appendChild(addTaskButton());
        contentBody.appendChild(addTaskPopup());
    }

    const loadToday = () => {
        UI.loadProjectContent('Today');
    }

    const loadThisWeek = () => {
        UI.loadProjectContent('This week');
    }

    const loadProjectContent = (project) => {
        const content = document.querySelector('#content');

        content.innerHTML = `
            <div id="content-title">${project}</div>
            <div id="content-body"></div>`;
    }

    const addTaskButton = () => {
        const taskBtn = document.createElement('button');

        taskBtn.classList.add("add-task-btn");
        taskBtn.textContent = 'Add Task';
        taskBtn.addEventListener('click', openTaskPopup)

        return taskBtn;
    }

    const addTaskPopup = () => {
        const popUpContainer = document.createElement('div');
        const popUpBtns = document.createElement('div');
        const input = document.createElement('input');
        const addBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        addBtn.textContent = 'ADD';
        cancelBtn.textContent = 'CANCEL';

        popUpContainer.classList.add('task-popup');
        input.classList.add('task-popup-input');
        popUpBtns.classList.add('task-popup-btns');
        addBtn.classList.add('task-popup-add-btn');
        cancelBtn.classList.add('task-popup-cancel-btn');
        
        cancelBtn.addEventListener('click', closeTaskPopup);

        popUpContainer.appendChild(input);
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

    return { loadHome, 
            loadToday, 
            loadThisWeek, 
            loadProjectContent, 
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