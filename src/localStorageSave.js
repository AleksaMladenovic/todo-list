import { events } from "./pubSub";
import { listOfProjects, Project } from "./project";
import { Task } from "./task";

events.on("listChange", updateStorage);
export function updateStorage() {
  deleteProjectFromTasks();
  localStorage.setItem("listOfProjects", JSON.stringify(listOfProjects.list));
  returnProjectToTasks();
}

export function getStored() {
  const newList = JSON.parse(localStorage.getItem("listOfProjects"));
  if(newList===null)
    return;
  listOfProjects.list = [];
  newList.forEach(project=>{
    const newProject = Project();
    newProject.copyProject(project);
    listOfProjects.addProject(newProject);

    project.tasks.forEach(task=>{
        const newTask = Task();
        newTask.copyTask(task);
        newProject.addTask(newTask);
    })
  })
  returnProjectToTasks();
}

function deleteProjectFromTasks() {
  listOfProjects.list.forEach((project) => {
    project.tasks.forEach((task) => {
      delete task.project;
    });
  });
}

function returnProjectToTasks() {
  listOfProjects.list.forEach((project) => {
    project.tasks.forEach((task) => {
        task.project = project;
    });
  });
}
