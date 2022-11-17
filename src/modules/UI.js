import Task from "./task";
import Storage from "./Storage";
import Project from "./project";
import TodoList from "./todoList";
const UI = (() => {
    const loadProjectContent = (projectName) => {
        const content = document.querySelector('#content');
        content.innerHTML = `
        <div id="content-title">${projectName}</div>
        <div id="content-body"></div>`;

        const contentBody = document.querySelector('#content-body');

        contentBody.appendChild(UI.loadTasks(projectName));

        if (projectName !== 'Today' && projectName !== 'This week'){
            contentBody.appendChild(UI.createAddTaskButton());
            contentBody.appendChild(UI.createAddTaskPopup(projectName));
        }

        UI.loadProjects();
        UI.closeProjectPopup();
        
    }

    const createAddTaskButton = () => {
        const taskBtn = document.createElement('button');

        taskBtn.classList.add("add-task-btn");
        taskBtn.textContent = 'Add Task';
        taskBtn.addEventListener('click', UI.openTaskPopup)

        return taskBtn;
    }

    const createAddTaskPopup = (projectName) => {
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
            UI.addTask(projectName, taskTitleVal);
        });
        cancelBtn.addEventListener('click', UI.closeTaskPopup);

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

    const addTask = (projectName, task) => {
        Storage.addTask(projectName, Task(task));
        UI.closeTaskPopup();
        UI.createNewTask(task);
    }

    const createNewTask = (task) => {
        const container = document.querySelector('.tasks');
        const taskDiv = document.createElement('div');
        taskDiv.textContent = task;
        container.appendChild(taskDiv)
    }

    const loadTasks = (projectName) => {
        const container = document.createElement('div');
        container.classList.add(`tasks`);

        Storage.getTodoList()
        .getProject(projectName)
        .getTasks()
        .forEach((task) => {
            const newC = document.createElement('div');
            newC.textContent = task.title;
            container.appendChild(newC)
        })

        return container;
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
        const popUpInput = document.querySelector('.task-popup-title');

        addTaskBtn.style.display = 'block';
        popUpContainer.style.display = 'none';
        popUpInput.value = '';
    }

    const addProject = () => {
        const projectName = document.querySelector('.project-popup-input').value;

        Storage.addProject(Project(projectName));
        UI.createNewProject(projectName);
        UI.closeProjectPopup();
    }

    const createNewProject = (projectName) => {
        const container = document.querySelector('.projects-container');
        const button = document.createElement('button');

        button.textContent = projectName;
        button.classList.add('project');
        button.addEventListener('click', () => {
            UI.loadProjectContent(projectName);
        })

        container.appendChild(button);
    }

    const loadProjects = () => {
        const container = document.querySelector('.projects-container');

        container.textContent = '';
        Storage.getTodoList()
            .getProjects()
            .forEach((project) => {
                if(project.getName() !== 'Todos' &&
                project.getName() != 'Today' &&
                project.getName() != 'This week'){
                    const button = document.createElement('button');
                    
                    button.textContent = project.getName();
                    button.classList.add('project-btn')
                    button.addEventListener('click',()=>{
                        UI.loadProjectContent(project.getName())
                    })
                    container.appendChild(button);
                }
            })
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
        const popUpInput = document.querySelector('.project-popup-input');

        addProjectBtn.style.display = 'block';
        popUpContainer.style.display = 'none';
        popUpInput.value = '';
    }

    return { loadProjectContent, 
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
            closeProjectPopup };
})();

const projectBtn = document.querySelectorAll('.project-btn');
projectBtn.forEach((btn) => {
    const projectName = btn.textContent;
    btn.addEventListener('click', () => {
        UI.loadProjectContent(projectName);
    })
})

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', UI.openProjectPopup);

const projectPopupAdd = document.querySelector('.project-popup-add-btn');
projectPopupAdd.addEventListener('click', UI.addProject);

const projectPopupCancel = document.querySelector('.project-popup-cancel-btn');
projectPopupCancel.addEventListener('click', UI.closeProjectPopup)


export default UI;