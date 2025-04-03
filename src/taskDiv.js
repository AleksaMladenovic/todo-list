export const TaskDiv = (Task) => {
  const div = document.createElement("div");
  div.classList.add("Task");

  const title = document.createElement("h3");
  title.textContent = Task.title;
  div.appendChild(title);

  const description = document.createElement("p");
  description.textContent = Task.description;
  div.appendChild(description);

  const dueDate = document.createElement("p");
  dueDate.textContent = Task.dueDate;
  div.appendChild(dueDate);

  const priority = document.createElement("p");
  priority.textContent = Task.priority;
  div.appendChild(priority);

  const btnChange = document.createElement("button");
  btnChange.textContent = "Change";
  div.appendChild(btnChange);

  const btnRemove = document.createElement("button");
  btnRemove.textContent = "Remove";
  div.appendChild(btnRemove);

  return { div, title, description, dueDate, priority, btnChange, btnRemove };
};
