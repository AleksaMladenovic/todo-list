import { returnCompareFunction } from "./task";
import { events } from "./pubSub";
export const Project = (title) =>{
    const project = {
        title,
        tasks: [], 
        orderedTasks: [],
        addTask, 
        removeTask,
        copyProject,
        sortTasks,
    };

    let sortFunction = returnCompareFunction("default");

    function addTask(task){
        project.tasks.push(task);
        project.orderedTasks.push(task);
        project.orderedTasks.sort(sortFunction);
        events.emit("listChange");
    }

    function removeTask(task){
        project.tasks.splice(project.tasks.findIndex(item => item ===task ),1);
        project.orderedTasks.splice(project.orderedTasks.findIndex(item => item ===task ),1);
        events.emit("listChange");
    }

    function copyProject(newProject){
        project.title = newProject.title;
    }

    function sortTasks(sortType){
        if(sortType)
            setSortType(sortType);
        project.orderedTasks.sort(sortFunction);
    }

    function setSortType(sortType){
        if(sortType==="default")
            project.orderedTasks = project.tasks;
        sortFunction = returnCompareFunction(sortType);
    }

    return project;
}

export let listOfProjects = {
    list:[],
    addProject: function(project){
        this.list.push(project);
        events.emit("listChange");
    },
    removeProject: function(project){
        this.list.splice(this.list.findIndex(item=>item===project),1);
        events.emit("listChange");
    }
};

