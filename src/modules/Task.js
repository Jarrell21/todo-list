const task = (title) => {

    const getTitle = () => title;

    // const getDateFormatted = () => {
    //     const day = dueDate.split('/')[0]
    //     const month = dueDate.split('/')[1]
    //     const year = dueDate.split('/')[2]
    //     return `${month}/${day}/${year}`
    // }

    return { getTitle };

};

export default task;