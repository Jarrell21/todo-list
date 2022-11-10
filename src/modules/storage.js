import Project from "./Project";
import TodoList from "./TodoList";
import Task from "./task";

const Storage = (() => {
    const saveTodoList = (data) => {
        localStorage.setItem('todoList', JSON.stringify(data));

        console.log('SAVED', JSON.stringify(data));
    }

    const getTodoList = () => {
        console.log('PARSE', JSON.parse(localStorage.getItem('todoList')));
        const todoList = Object.assign(
            TodoList(),
            JSON.parse(localStorage.getItem('todoList'))
        )
        console.log('ASSIGNED', JSON.stringify(todoList));

        todoList.setProjects(
            todoList
                .getProjects()
                .map((project) => Object.assign(Project(), project))
        )

        console.log('SET', JSON.stringify(todoList));
        todoList
            .getProjects()
            .forEach((project) =>
                project.setTasks(
                    project.getTasks().map((task) => Object.assign(Task(), task))
                )
            )

        console.log('LOCAL', localStorage.getItem('todoList'));
        console.log('GET', JSON.stringify(todoList));
        
        return todoList;
    }

    const addProject = (project) => {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.saveTodoList(todoList);
    }

    const addTask = (projectName, task) => {
        const todoList = Storage.getTodoList();
        todoList.getProject(projectName).addTask(task);
        Storage.saveTodoList(todoList);
    }


    return { getTodoList,  saveTodoList, addTask, addProject };

})();

export default Storage;