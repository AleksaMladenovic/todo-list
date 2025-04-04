import { ta } from "date-fns/locale";

export const TaskDiv = (task) => {
  const div = createDiv();

  const title = createTitle(task);
  div.appendChild(title);

  const description = createDescription(task);
  div.appendChild(description);

  const dueDate = createDueDate(task);
  div.appendChild(dueDate);

  const priority = createPriority(task);
  div.appendChild(priority);

  const doneCheckbox = createDoneCheckbox(task);
  div.appendChild(doneCheckbox);

  const btnChange = createButton("Change","change");
  div.appendChild(btnChange);

  const btnRemove = createButton("Remove","remove");
  div.appendChild(btnRemove);

  return {
    div,
    title,
    description,
    dueDate,
    priority,
    doneCheckbox,
    btnChange,
    btnRemove,
  };
};

function createDiv() {
  const div = document.createElement("div");
  div.classList.add("Task");
  return div;
}

function createTitle(task) {
  const title = document.createElement("h3");
  title.textContent = task.title;
  return title;
}

function createDescription(task) {
  const description = document.createElement("p");
  description.textContent = task.description;
  return description;
}

function createDueDate(task) {
  const dueDate = document.createElement("p");
  dueDate.textContent = task.dueDate;
  return dueDate;
}

function createPriority(task) {
  const priority = document.createElement("p");
  priority.textContent = task.priority;
  return priority;
}

function createDoneCheckbox(task) {
  const doneCheckbox = document.createElement("input");
  doneCheckbox.setAttribute("type", "checkbox");
  if (task.done) doneCheckbox.setAttribute("checked", "");

  return doneCheckbox;
}

function createButton(textContent,classAtribute ){
    const button = document.createElement("button");
    button.textContent = textContent;
    button.className = classAtribute;
    return button;
}