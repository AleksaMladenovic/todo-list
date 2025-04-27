import { Project, listOfProjects} from "./project";
import { Task } from "./task";
import { runHomepage } from "./homepage";
import "./styles.css";
import { getTask } from "./taskDialogControl";
import { getStored } from "./localStorageSave";

// const project1 = Project("project1");
// const task1 = Task("task1","moj prvi task","2025-04-04T18:45" ,"Low", project1);
// const task2 = Task("task2","moj drugi task","2025-04-26T10:50" ,"High", project1);

// listOfProjects.addProject(project1);
// project1.addTask(task1);
// project1.addTask(task2);

// const project2 = Project("project2");
// listOfProjects.addProject(project2);


// console.log(listOfProjects.list);
getStored();
runHomepage();

window.listaProjekta = listOfProjects;