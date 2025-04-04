import "./styles.css";
import { compareTasksByDueDate, Task } from "./task";
import { Project,projects } from "./project";
import "./domControls.js"
import { runHomepage } from "./homepage.js";

export function removeProject(project){
    projects.removeProject(project);

}

export function removeTask(task, project){
    project.removeTask(task);
}

const proj1 = Project("proj1");
projects.addProject(proj1);
const task1 = Task("Task 1","skadlsajdlkaj","2025-04-11T01:07","High");
const task2 = Task("Task 2","skadlsajdlkaj","2025-04-07T01:07","Low");

proj1.addTask(task1);
proj1.addTask(task2);

const proj2 = Project("proj2");
projects.addProject(proj2);
const task3 = Task("Task 3","skadlsajdlkaj","2025-04-11T01:07","Low");
const task4 = Task("Task 4","skadlsajdlkaj","2025-04-11T01:07","High");

proj2.addTask(task3);
proj2.addTask(task4);

runHomepage();

const compared = compareTasksByDueDate(task1,task2);

console.log(compared);