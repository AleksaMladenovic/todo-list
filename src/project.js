import { events } from "./pubSub";
import { compareTasksByDueDate, compareTasksByPriority } from "./task";

export const Project = (title)=>{
    const project = {
        title,
        tasks: [],
        sortType: "priority",
        addTask,
        removeTask,
        log,
        setSortType,
        sortTasks,
        compareFunction: compareTasksByPriority,
    };

    function addTask(task){
        project.tasks.push(task);
        sortTasks();
        events.emit("AddTask",task,project);
    }

    function removeTask(task){
        project.tasks = project.tasks.filter((item) => item!==task);
    }

    function log (){
        console.log("This is inside Project:" + project.title);
        project.tasks.forEach((task)=>task.log());
        console.log("");
    }

    function sortTasks(){
        project.tasks.sort(project.compareFunction);
        events.emit("SortTask");
    }

    function setSortType(sortType){
        switch(sortType){
            case "priority":
                project.compareFunction = compareTasksByPriority;
                break;
            case "dueDate":
                project.compareFunction = compareTasksByDueDate;
        }
        project.sortType = sortType; 
        project.sortTasks();
    }
    return project;
}

export const projects = {
    list : [],
    addProject(project){
        this.list.push(project);
        events.emit("AddProject",project);
    },
    removeProject(project){
        this.list = this.list.filter((item)=>item!==project);
    },
    log(){
        console.log("Projects:");
        this.list.forEach(project => {
            project.log();
        });
    }
}