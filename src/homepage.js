import { listOfProjects, Project } from "./project";
import { changeProject, getProject } from "./projectDialogControl";
import { changeTask, getTask } from "./taskDialogControl";
import { SVG } from "./svgs";
import { compareAsc, format, formatDistance } from "date-fns";
import { events } from "./pubSub";

const htmlContent = document.querySelector("div.content");

let newProjectButton;

const projectTemplate = document.querySelector("#project-template-homepage");
const homepageTemplate = document.querySelector("#homepage-template");
const taskTemplate = document.querySelector("#task-template-homepage");

export const Homepage = {
  run: runHomepage,
  close: closeHomepage,
};

export function runHomepage() {
  htmlContent.classList.add("homepage");

  const homepageClone = homepageTemplate.content.cloneNode(true);
  newProjectButton = homepageClone.querySelector(".newProjectBtn");
  htmlContent.appendChild(homepageClone);

  listOfProjects.list.forEach((project) => displayProject(project));

  newProjectButton.addEventListener("click", async () => {
    const newProject = await getProject();
    if (newProject !== null) {
      displayProject(newProject);
      listOfProjects.addProject(newProject);
    }
  });
}

function closeHomepage() {
  htmlContent.classList.remove("homepage");
}

function ExpandedElements() {
  return {
    list: [],
    add(el) {
      this.list.push({ element: el, elementStyle: el.style.display });
    },
    hide() {
      this.list.forEach((el) => {
        el.element.style.display = "none";
      });
    },
    display() {
      this.list.forEach((el) => {
        el.element.style.display = el.elementStyle;
      });
    },
  };
}

function displayProject(project) {
  const expandedElements = ExpandedElements();
  const clone = projectTemplate.content.cloneNode(true);

  const projectDiv = clone.querySelector(".project");
  htmlContent.appendChild(projectDiv);
  //title
  const title = projectDiv.querySelector("h2");
  title.textContent = project.title;

  //expand button
  const expandBtn = projectDiv.querySelector("button.expand");
  expandBtn.innerHTML = SVG.expand;

  //add task button
  const addTaskBtn = projectDiv.querySelector("button.addTaskBtn");
  addTaskBtn.innerHTML = SVG.plus;
  expandedElements.add(addTaskBtn);

  //change button
  const changeBtn = projectDiv.querySelector("button.changeBtn");
  changeBtn.innerHTML = SVG.edit;

  //delete button
  const deleteBtn = projectDiv.querySelector("button.removeBtn");
  deleteBtn.innerHTML = SVG.remove;

  //sort type for tasks
  const selectSortType = projectDiv.querySelector("select");
  expandedElements.add(selectSortType);

  const tasksDiv = projectDiv.querySelector("div.tasks");

  expandBtn.addEventListener("click", (e) => {
    if (expandBtn.classList.contains("expand")) {
      expand(expandBtn, project, tasksDiv,expandedElements);
    } else hide(expandBtn, tasksDiv,expandedElements);
  });

  addTaskBtn.addEventListener("click", async () => {
    const newTask = await getTask(project);
    if (newTask !== null) {
      project.addTask(newTask);
      displayAllTasks(project, tasksDiv);
    }
  });

  changeBtn.addEventListener("click", async () => {
    const newProject = await changeProject(project);
    if (newProject !== null) {
      project.copyProject(newProject);
      changeMade();
    }
  });

  deleteBtn.addEventListener("click", () => {
    const answer = confirm(
      "Are you sure you want to delete project: " +'"'+ project.title+'" ' + "?"
    );
    if (answer) {
      listOfProjects.removeProject(project);
      htmlContent.removeChild(projectDiv);
    }
  });

  selectSortType.addEventListener("change", () => {
    project.sortTasks(selectSortType.value);
    displayAllTasks(project, tasksDiv);
  });
  function changeMade() {
    title.textContent = project.title;
    events.emit("listChange");
  }
  expandedElements.hide();
}

function expand(button, project, tasksDiv, expandedElements) {
  button.innerHTML = SVG.hide;
  button.classList.remove("expand");
  button.classList.add("hide");
  expandedElements.display();
  displayAllTasks(project, tasksDiv);
}

function displayAllTasks(project, tasksDiv) {
  tasksDiv.innerHTML = "";
  project.orderedTasks.forEach((task) => {
    displayTask(task, tasksDiv, project);
  });
}

function hide(button, tasksDiv, expandedElements) {
  button.innerHTML = SVG.expand;
  button.classList.remove("hide");
  button.classList.add("expand");
  tasksDiv.innerHTML = "";
  expandedElements.hide();
}

function displayTask(task, tasksDiv, project) {
  const clone = taskTemplate.content.cloneNode(true);
  const taskDiv = clone.querySelector("div.task");
  tasksDiv.appendChild(taskDiv);

  const title = taskDiv.querySelector("h3");
  title.textContent = task.title;

  const description = taskDiv.querySelector("p.description");
  description.textContent = task.description;

  const dueDate = taskDiv.querySelector("p.dueDate");
  dueDate.textContent = formateTheDate(task.dueDate);
  togleDueDateDisplay();

  const changeBtn = taskDiv.querySelector("button.changeBtn");
  changeBtn.innerHTML= SVG.edit;

  const deleteBtn = taskDiv.querySelector("button.deleteBtn");
  deleteBtn.innerHTML = SVG.remove;

  const doneCheck = taskDiv.querySelector("input[name='doneCheck'");
  if(task.done)
    doneCheck.checked = true;

  doneCheck.addEventListener("change", ()=>{
    task.togleDone();
  })
  taskDiv.classList.add(`${task.priority}Priority`);
  changeBtn.addEventListener("click", async () => {
    const newTask = await changeTask(task);
    if (newTask !== null) {
      task.copyTask(newTask);
      changeMade();
    }
  });

  deleteBtn.addEventListener("click", () => {
    const answer = confirm(
      "Are you sure you want to delete task:"+' "' + task.title+'" ' + "?"
    );
    if (answer) {
      project.removeTask(task);
      tasksDiv.removeChild(taskDiv);
    }
  });

  function changeMade() {
    title.textContent = task.title;
    description.textContent = task.description;
    dueDate.textContent = task.dueDate;
    taskDiv.className = "task";  
    taskDiv.classList.add(`${task.priority}Priority`);
    events.emit("listChange");
  }

  dueDate.addEventListener("click",togleDueDateDisplay);

  function togleDueDateDisplay(){
    if(dueDate.textContent===formateTheDate(task.dueDate)){
      if(compareAsc(new Date(task.dueDate),new Date())===1)
        dueDate.textContent = formatDistance(new Date(task.dueDate),new Date());
      else
        dueDate.textContent ="you late "+formatDistance(new Date(task.dueDate),new Date());

    }else{
      dueDate.textContent = formateTheDate(task.dueDate);
    }
  }
}

function formateTheDate(dateString){
  const formatted = format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  return formatted;
}