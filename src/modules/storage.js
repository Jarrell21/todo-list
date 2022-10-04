const Storage = (() => {
    const addTask = (key, value) => {
        localStorage.setItem(key, value);
    }

    const getTasks = (key) => {
        const task = localStorage.getItem(key);
        
        return task;
    }

    return { addTask, getTasks };

})();

export default Storage;