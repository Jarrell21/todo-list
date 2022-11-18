const task = (title, dueDate) => {
  const getTitle = () => title;

  const getDate = () => dueDate;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const setDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  //   const getDateFormatted = () => {
  //     const day = dueDate.split('/')[0];
  //     const month = dueDate.split('/')[1];
  //     const year = dueDate.split('/')[2];
  //     return `${month}/${day}/${year}`;
  //   };

  const toJSON = () => ({
    title: getTitle(),
    dueDate: getDate(),
  });

  return { getTitle, setTitle, getDate, setDate, toJSON };
};

export default task;
