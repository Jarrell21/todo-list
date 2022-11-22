import { format } from 'date-fns';

const task = (title, dueDate, status) => {
  const getTitle = () => title;

  const getDate = () => dueDate;

  const getStatus = () => status;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const setDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  const setStatus = (newStatus) => {
    status = newStatus;
  };

  const getDateFormatted = () => {
    const year = dueDate.split('-')[0];
    const month = dueDate.split('-')[1];
    const day = dueDate.split('-')[2];
    return `${month}/${day}/${year}`;
  };

  const toJSON = () => ({
    title: getTitle(),
    dueDate: getDate(),
    status: getStatus(),
  });

  return {
    getTitle,
    setTitle,
    getDate,
    setDate,
    getStatus,
    setStatus,
    toJSON,
    getDateFormatted,
  };
};

export default task;
