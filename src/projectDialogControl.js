import { Project } from "./project";
import waitForClick from "./waitForClick";

const addProjectDialog = document.querySelector("#addProjectDialog");
const projectDialogBtnAdd = document.querySelector(
  "#addProjectDialog button.add"
);
const projectDialogBtnCancel = document.querySelector(
  "#addProjectDialog button.cancel"
);
const form = document.querySelector("#addProjectForm");

export async function getProject() {
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

export async function changeProject(project) {
  document.querySelector("#projectName").value = project.title;
  document.querySelector("button.add").textContent = "Change";
  const newProject = await getProject();
  document.querySelector("button.add").textContent = "Add";
  return newProject;
}

form.addEventListener("input", checkFormValidity);

function checkFormValidity(){
  if(form.checkValidity()){
    projectDialogBtnAdd.disabled = false;
  }else{
    projectDialogBtnAdd.disabled = true;
  }
}
checkFormValidity();