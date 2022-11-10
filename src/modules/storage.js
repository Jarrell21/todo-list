import Project from "./Project";
import TodoList from "./TodoList";
import Task from "./task";

const storage = (() => {
    const saveTodoList = (data) => {
        localStorage.setItem('todoList', JSON.stringify(data));

        const harry = Project('harry');
        console.log(JSON.stringify(harry));
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
            
            console.log(todoList);
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
        storage.saveTodoList(todoList);
    }


    return { getTodoList,  saveTodoList, addTask, addProject };

})();

export default storage;