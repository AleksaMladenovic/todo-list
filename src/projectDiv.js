export const ProjectDiv = (project) => {
  const div = createDiv();

  const title = createTitle(project);
  div.appendChild(title);

  const sort = createSort(project);
  div.appendChild(sort.labelForSort);
  div.appendChild(sort.selectSort);

  const btnAddTask = createButton("Add Task", "addTask");
  div.appendChild(btnAddTask);

  const btnRemove = createButton("Remove", "remove");
  div.appendChild(btnRemove);

  const btnChange = createButton("Change", "change");
  div.appendChild(btnChange);

  return {div,title,btnAddTask,btnRemove, btnChange,selectSort: sort.selectSort};
};

function createDiv(){
    const div = document.createElement("div");
    div.classList.add("Project");
    return div;
}

function createTitle(project){
    const title = document.createElement("h2");
    title.textContent = project.title;
    return title;
}

function createSort(project){
  const labelForSort = document.createElement("label");
  labelForSort.setAttribute("for","sortType");

  const selectSort = document.createElement("select");
  selectSort.setAttribute("name", "sortType");
  selectSort.setAttribute("id", "sortType");

  let option = document.createElement("option");
  option.value = "priority";
  option.textContent = "Priority";
  selectSort.appendChild(option);

  option = document.createElement("option");
  option.value = "dueDate";
  option.textContent = "Due Date";
  selectSort.appendChild(option);

   selectSort.querySelector(`option[value='${project.sortType}'`).setAttribute("selected", "");
  return {labelForSort,selectSort};
}

function createButton(textContent,classAtribute ){
    const button = document.createElement("button");
    button.textContent = textContent;
    button.className = classAtribute;
    return button;
}