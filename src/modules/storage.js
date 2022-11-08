import Project from "./Project";
import TodoList from "./TodoList";
import Task from "./task";
const storage = (() => {
    const saveTodoList = (data) => {
        localStorage.setItem('todoList', JSON.stringify(data));
    }

    const getTodoList = () => {
        const todoList = Object.assign(
            TodoList(),
            JSON.parse(localStorage.getItem('todoList'))
        )

        todoList.setProjects(
            todoList
                .getProjects()
                .map((project) => Object.assign(Project(), project))
        )

        todoList
            .getProjects()
            .forEach((project) =>
                project.setTasks(
                    project.getTasks().map((task) => Object.assign(Task(), task))
                )
            )
            
        return todoList;
    }

    const addProject = (project) => {
        const todoList = storage.getTodoList();
        todoList.addProject(project);
        storage.saveTodoList(todoList);
    }

    const addTask = (projectName, task) => {
        const todoList = storage.getTodoList();
        todoList.getProject(projectName).addTask(task);
        storage.saveTodoList(todoList)
    }

    const getTasks = (key) => {
        return localStorage.getItem(key);
    }

    return { getTodoList ,getTasks,  saveTodoList, addTask, addProject };

})();

export default storage;