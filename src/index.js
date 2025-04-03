import "./styles.css";
import { Task } from "./task";
import { Project,projects } from "./project";
import {createTask, createProject,displayTask} from "./domControls.js";

export function addProject(project){
    projects.addProject(project);
    return createProject(project);
}

export function addTask(task, project, projectDom){
    project.addTask(task);
    createTask(task,project,projectDom);
}

export function removeProject(project){
    projects.removeProject(project);

}

export function removeTask(task, project){
    project.removeTask(task);
}

const proj1 = Project("proj1");
const proj1Div = addProject(proj1);
const taks1 = Task("Task 1","skadlsajdlkaj","2025-04-11T01:07","High");
addTask(taks1, proj1,proj1Div);