export const Project = (title)=>{
    const obj = {
        title,
        tasks: [],
    };

    const addTask = (task)=>{
        obj.tasks.push(task);
    }

    const removeTask = (task) =>{
        obj.tasks = obj.tasks.filter((item) => item!==task);
    }

    const log = () =>{
        console.log("This is inside Project:" + obj.title);
        obj.tasks.forEach((task)=>task.log());
        console.log("");
    }
    return Object.assign(obj,{addTask,removeTask,log});
}

export let projects = {
    list : [],
    addProject(project){
        this.list.push(project);
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