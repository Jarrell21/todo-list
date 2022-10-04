const Task = (title) => {

    const getDateFormatted = () => {
        const day = dueDate.split('/')[0]
        const month = dueDate.split('/')[1]
        const year = dueDate.split('/')[2]
        return `${month}/${day}/${year}`
    }

    return { title, getDateFormatted };

};

export default Task;