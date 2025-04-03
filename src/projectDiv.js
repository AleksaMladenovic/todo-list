export const ProjectDiv = (Project) => {
  const div = document.createElement("div");
  div.classList.add("Project");

  const title = document.createElement("h2");
  title.textContent = Project.title;
  div.appendChild(title);

  const btnAddTask = document.createElement("button");
  btnAddTask.textContent = "Add Task";
  div.appendChild(btnAddTask);

  const btnRemove = document.createElement("button");
  btnRemove.textContent = "Remove";
  div.appendChild(btnRemove);

  const btnChange = document.createElement("button");
  btnChange.textContent = "Change"
  div.appendChild(btnChange);
  return {div,title,btnAddTask,btnRemove, btnChange};
};
