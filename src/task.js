import { compareAsc } from "date-fns";
import { events } from "./pubSub";

export const Task = (title, description, dueDate, priority, project) => {
  const task = {
    title,
    description,
    dueDate,
    priority,
    done: false,
    project,
    copyTask,
    togleDone,
  };

  function copyTask(newTask) {
    task.title = newTask.title;
    task.description = newTask.description;
    task.dueDate = newTask.dueDate;
    task.priority = newTask.priority;
    task.done = newTask.done;
  }

  function togleDone(){
    task.done = !task.done;
    events.emit("listChange");
  }
  return task;
};

export function returnCompareFunction(sortBy){
    const priorityValues = {High:3,Normal:2,Low:1}

    if(sortBy==="default")
        return function(a,b){ return 0};
    if(sortBy==="dueDate")
        return function(a,b){
            return compareAsc(a.dueDate,b.dueDate);
        }
    if(sortBy==="priority")
        return function(a,b){
            return priorityValues[b.priority]-priorityValues[a.priority];
        }
  }