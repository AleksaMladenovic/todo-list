import { projects } from "./project";
import { createProjectDom,createTaskDom, initialSettings } from "./domControls";
import { Project } from "./project";
import { Task } from "./task";
import { events } from "./pubSub";

const projectsDiv = document.createElement("div");
projectsDiv.className = "Projects Homepage";
projectsDiv.innerHTML = `<h1>Projects</h1>
            <button class="btnAddProject">Add Project</button>`;

function addProject(project){
    const projectDom = createProjectDom(project);
    projectsDiv.appendChild(projectDom.div);
    return projectDom;
}

function addTask(task, project, projectDom){
    const taskDom = createTaskDom(task,project);
    projectDom.div.appendChild(taskDom.div);
    return taskDom;
}

export function runHomepage(){
    document.querySelector(".content").appendChild(projectsDiv);
    initialSettings();
}
    
function updateHomepage(){
    projectsDiv.innerHTML = `<h1>Projects</h1>
            <button class="btnAddProject">Add Project</button>`;
    projects.list.forEach(project => {
        const projectDom = addProject(project);
        project.tasks.forEach(task =>{
            addTask(task,project,projectDom);
        });
    });
}
events.on("AddProject", updateHomepage);
events.on("AddTask",updateHomepage);
events.on("SortTask",updateHomepage);