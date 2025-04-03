export const Task = (title, description, dueDate, priority) => {
  const obj = {title,description,dueDate,priority};
  const log = () => {
    console.log(`This taks: ${obj.title}`);
    console.log(`Description: ${obj.description}`);
    console.log(`Due Date: ${obj.dueDate}`);
    console.log(`Priority: ${obj.priority}`);
  };

  const change = (_title, _description, _dueDate, _priority) => {
    obj.title = _title;
    obj.description = _description;
    obj.dueDate = _dueDate;
    obj.priority = _priority;
  };

  return Object.assign(obj,{log}, {change} );
};
