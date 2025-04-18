import { removeTask } from ".";

const buttonsSvgs = {
  addTask: `<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1037.000000)" fill="#000000"> <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>`,
  remove: `<svg viewBox="-0.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>icon/18/icon-delete</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketch:type="MSShapeGroup"> </path> </g> </g></svg>`,
  change: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#000000"></path></g></svg>`,
};
export const ProjectDiv = (project) => {
  let expanded = false;
  const div = createDiv();

  const title = createTitle(project);
  div.appendChild(title);

  const btnExpand = createButton("Expand","expand");
  div.appendChild(btnExpand);

  const buttons = createButtons();
  div.appendChild(buttons.div);

  const sort = createSort(project);
  div.appendChild(sort.labelForSort);
  div.appendChild(sort.selectSort);

  function createCustomDiv(listOfProperties) {
    div.innerHTML = "";
    listOfProperties.forEach((Property) => {
      div.appendChild(Property);
    });
  }
  function resetDiv() {
    div.innerHTML = "";
    div.appendChild(title);
    div.appendChild(buttons.div);
    div.appendChild(sort.labelForSort);
    div.appendChild(sort.selectSort);
  }
  return {
    div,
    expanded,
    title,
    btnAddTask: buttons.btnAddTask,
    btnRemove: buttons.btnRemove,
    btnChange: buttons.btnChange,
    btnExpand,
    buttonsDiv: buttons.div,
    selectSort: sort.selectSort,
    labelForSort: sort.labelForSort,
    createCustomDiv,
    resetDiv,
  };
};

function createDiv() {
  const div = document.createElement("div");
  div.classList.add("Project");
  return div;
}

function createTitle(project) {
  const title = document.createElement("h2");
  title.textContent = project.title;
  return title;
}

function createSort(project) {
  const labelForSort = document.createElement("label");
  labelForSort.setAttribute("for", "sortType");
  labelForSort.textContent = "Sort by:";

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

  selectSort
    .querySelector(`option[value='${project.sortType}'`)
    .setAttribute("selected", "");
  return { labelForSort, selectSort };
}

function createButton(textContent, classAtribute) {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.className = classAtribute;

  if (buttonsSvgs.hasOwnProperty(classAtribute)) {
    button.innerHTML = buttonsSvgs[classAtribute];
  }
  return button;
}

function createButtons() {
  const div = document.createElement("div");
  div.className = "buttons";

  const btnAddTask = createButton("Add Task", "addTask");
  div.appendChild(btnAddTask);

  const btnRemove = createButton("Remove", "remove");
  div.appendChild(btnRemove);

  const btnChange = createButton("Change", "change");
  div.appendChild(btnChange);

  return { div, btnAddTask, btnRemove, btnChange };
}
