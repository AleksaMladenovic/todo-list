import {compareAsc, compareDesc,format} from "date-fns";

export const Task = (title, description, dueDate, priority) => {
  const task = { title, description, dueDate, priority,done:false, log, change };
  function log() {
    console.log(`This taks: ${task.title}`);
    console.log(`Description: ${task.description}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Priority: ${task.priority}`);
  }

  function change(_title, _description, _dueDate, _priority) {
    task.title = _title;
    task.description = _description;
    task.dueDate = _dueDate;
    task.priority = _priority;
  }

  return task;
};

export function compareTasksByPriority(task1, task2){
    let priorityList = {};
    priorityList["High"] = 3;
    priorityList["Normal"]=2;
    priorityList["Low"]=1;
    if(priorityList[task1.priority]>priorityList[task2.priority])
        return -1;
    if(priorityList[task1.priority]>priorityList[task2.priority])
        return 1;
    return 0;
}

export function compareTasksByDueDate(task1,task2){
    const task1Date = new Date(task1.dueDate);
    const task2Date = new Date(task2.dueDate);
    return compareAsc(task1Date,task2Date);
}