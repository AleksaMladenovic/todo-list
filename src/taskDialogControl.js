import waitForClick from "./waitForClick";
import { Task } from "./task";

const addTaskDialog = document.querySelector("#addTaskDialog");
const taskDialogBtnAdd = document.querySelector("#addTaskDialog button.add");
const taskDialogBtnCancel = document.querySelector(
  "#addTaskDialog button.cancel"
);
const form = document.querySelector("#addTaskForm");

export async function getTask(project) {
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
  const newTask = Task(taskTitle, taskDescription, taskDueDate, priority,project);
  addTaskDialog.close();
  clearTaskDialog();
  return newTask;
}

function clearTaskDialog() {
  document.querySelector("#taskTitle").value = "";
  document.querySelector("#taskDescription").value = "";
  document.querySelector("#taskDueDate").value = "";
    document.querySelector(`input[name="priority"][value="Normal"]`).checked = true;
}

export async function changeTask(task){
  insertTaskToDialog(task);
  document.querySelector("#addTaskDialog button.add").textContent = "Change";
  const newTask = await getTask();
  newTask.done = task.done;
  document.querySelector("#addTaskDialog button.add").textContent = "Add Task";
  return newTask;
}

function insertTaskToDialog(task){
    document.querySelector("#taskTitle").value = task.title;
    document.querySelector("#taskDescription").value = task.description;
    document.querySelector("#taskDueDate").value = task.dueDate;
    document.querySelector(
      'input[name="priority"][value="'+task.priority+ '"]'
    ).checked = true;
}

form.addEventListener("input",checkFormValidity);

function checkFormValidity(){
  if(form.checkValidity()){
    taskDialogBtnAdd.disabled = false;
  }else{
    taskDialogBtnAdd.disabled = true;
  }
}
checkFormValidity();