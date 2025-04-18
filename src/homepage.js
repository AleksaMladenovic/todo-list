import { projects } from "./project";
import {
  createProjectDom,
  createTaskDom,
  initialSettings,
} from "./domControls";
import { Project } from "./project";
import { Task } from "./task";
import { events } from "./pubSub";

const projectsDiv = document.createElement("div");
projectsDiv.className = "Projects Homepage";
resetProjectsDiv();

function resetProjectsDiv(){
    projectsDiv.innerHTML = `<div class="title"><h1>Projects</h1>
            <button class="btnAddProject">New Project</button></div>`;
}
export function runHomepage() {
  document.querySelector(".content").appendChild(projectsDiv);
  initialSettings();
}
function addProject(project) {
  const projectDom = createProjectDom(project);
//   projectDom.createCustomDiv([projectDom.title,projectDom.buttonsDiv]);
  projectsDiv.appendChild(projectDom.div);
  return projectDom;
}

function addTask(task, project, projectDom) {
  const taskDom = createTaskDom(task, project);
  projectDom.div.appendChild(taskDom.div);
  return taskDom;
}

function updateHomepage() {
  resetProjectsDiv();
  projects.list.forEach((project) => {
    const projectDom = addProject(project);
    if(projectDom.expanded){
        project.tasks.forEach((task) => {
            addTask(task, project, projectDom);
          });
    }
  });
}

events.on("AddProject", updateHomepage);
events.on("AddTask", updateHomepage);
events.on("SortTask", updateHomepage);
events.on("expandedChange", updateHomepage);