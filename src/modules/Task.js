const task = (title) => {

    const getTitle = () => title;

    const setTitle = (newTitle) => {
        title = newTitle
    }

    // const getDateFormatted = () => {
    //     const day = dueDate.split('/')[0]
    //     const month = dueDate.split('/')[1]
    //     const year = dueDate.split('/')[2]
    //     return `${month}/${day}/${year}`
    // }

    const toJSON = () => {
        return  {
            title: getTitle()
        }
    }

    return { getTitle, setTitle, toJSON };

};

export default task;