import { Project } from "./project.js";
import { Task } from "./task.js";
import { ProjectDiv } from "./projectDiv.js";
import { TaskDiv } from "./taskDiv.js";
import { projects } from "./project.js";

let addProjectBtn = document.querySelector("button.btnAddProject");
const addProjectDialog = document.querySelector("#addProjectDialog");
const projectDialogBtnAdd = document.querySelector(
  "#addProjectDialog button.add"
);
const projectDialogBtnCancel = document.querySelector(
  "#addProjectDialog button.cancel"
);
const addTaskDialog = document.querySelector("#addTaskDialog");
const taskDialogBtnAdd = document.querySelector("#addTaskDialog button.add");
const taskDialogBtnCancel = document.querySelector(
  "#addTaskDialog button.cancel"
);

export function initialSettings() {
  addProjectBtn = document.querySelector("button.btnAddProject");
  
  addProjectBtn.addEventListener("click", async () => {
    const newProject = await getProject();
    if (newProject !== null) projects.addProject(newProject);
  });
}

function waitForClick(buttons) {
  return new Promise((resolve) => {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        resolve(e.target.textContent);
      });
    });
  });
}



async function getProject() {
  addProjectDialog.showModal();
  const whatToDo = await waitForClick([
    projectDialogBtnAdd,
    projectDialogBtnCancel,
  ]);
  if (whatToDo === "Cancel") {
    clearProjectDialog();
    addProjectDialog.close();
    return null;
  }
  const projectTitle = document.querySelector("#projectName").value;
  const newProject = Project(projectTitle);
  addProjectDialog.close();
  clearProjectDialog();
  return newProject;
}

function clearProjectDialog() {
  document.querySelector("#projectName").value = "";
}

export function createProjectDom(project) {
  const projectDom = ProjectDiv(project);

  projectDom.btnAddTask.addEventListener("click", async () => {
    const newTask = await getTask();
    if (newTask !== null) project.addTask(newTask);
  });

  projectDom.btnRemove.addEventListener("click", () => {
    projects.removeProject(project);
    projectDom.div.remove();
  });

  projectDom.btnChange.addEventListener("click", async () => {
    await changeProject(project, projectDom);
  });

  projectDom.selectSort.addEventListener("change", ()=>{
    project.setSortType(projectDom.selectSort.value);
  })

  return projectDom;
}

async function changeProject(project, projectDom) {
  document.querySelector("#projectName").value = project.title;
  projectDialogBtnAdd.textContent = "Change";
  const changedProject = await getProject();
  projectDialogBtnAdd.textContent = "Add project";
  if (changedProject === null) return null;
  projectDom.title.textContent = changedProject.title;
  project.title = changedProject.title;
}

async function getTask() {
  addTaskDialog.showModal();
  const whatToDo = await waitForClick([taskDialogBtnAdd, taskDialogBtnCancel]);
  if (whatToDo === "Cancel") {
    clearTaskDialog();
    addTaskDialog.close();
    return null;
  }
  const taskTitle = document.querySelector("#taskTitle").value;
  const taskDescription = document.querySelector("#taskDescription").value;
  const taskDueDate = document.querySelector("#taskDueDate").value;
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const newTask = Task(taskTitle, taskDescription, taskDueDate, priority);
  addTaskDialog.close();
  clearTaskDialog();
  return newTask;
}

function clearTaskDialog() {
  document.querySelector("#taskTitle").value = "";
  document.querySelector("#taskDescription").value = "";
  document.querySelector("#taskDueDate").value = "";
  if (document.querySelector(`input[name="priority"]:checked`))
    document.querySelector(`input[name="priority"]:checked`).checked = false;
}

export function createTaskDom(task, project) {
  const taskDom = TaskDiv(task);

  taskDom.btnChange.addEventListener("click", async () => {
    await changeTask(task, taskDom);
  });

  taskDom.btnRemove.addEventListener("click", async () => {
    project.remove(task);
    taskDom.div.remove();
  });

  taskDom.doneCheckbox.addEventListener("change",()=>{
    task.done = true;
  })

  return taskDom;
}

async function changeTask(task, taskDom) {
  document.querySelector("#taskTitle").value = task.title;
  document.querySelector("#taskDescription").value = task.description;
  document.querySelector("#taskDueDate").value = task.dueDate;
  document.querySelector(`input[value=${task.priority}]`).checked = true;
  taskDialogBtnAdd.textContent = "Change";
  let changedTask = await getTask();
  taskDialogBtnAdd.textContent = "Add Task";
  if (changedTask === null) {
    return;
  }
  taskDom.title.textContent = changedTask.title;
  taskDom.description.textContent = changedTask.description;
  taskDom.dueDate.textContent = changedTask.dueDate;
  taskDom.priority.textContent = changedTask.priority;

  task.title = changedTask.title;
  task.description = changedTask.description;
  task.dueDate = changedTask.dueDate;
  task.priority = changedTask.priority;
}
