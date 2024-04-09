let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let mode = "all";
let filterList = [];
let tabs = document.querySelectorAll(".filter div");
let sideLine = document.getElementById("side-line");
let underLine = document.getElementById("bottom-line");

addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}

function addTask(){
    let taskValue = taskInput.value;
    if(taskValue === "") return alert("Please enter ur todo")
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render();
}

function render(){
    let list = [];
    if(mode === "all"){
        list = taskList;
    } else if(mode === "ongoing" || mode === "complete"){
        list = filterList;
    }

    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete === true){
            resultHTML += `<div class="task task-check">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="button-58" role="button"><span class="text">Check</span><span>✔️</span></button>
                <button onclick="deleteTask('${list[i].id}')" class="button-58" role="button"><span class="text">Delete</span><span>🗑</span></button>
            </div>
        </div>`
        } else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="button-57" role="button"><span class="text">Check</span><span>✔️</span></button>
                <button onclick="deleteTask('${list[i].id}')" class="button-57" role="button"><span class="text">Delete</span><span>🗑</span></button>
            </div>
        </div>`
        }
    }
    document.getElementById("right-side").innerHTML = resultHTML;
}


function randomIdGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter()
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i, 1);
            break;
        }
    }
    filter()
}

function filter(e){
    if(e){
        mode = e.target.id;
        sideLine.style.left = (e.currentTarget.offsetRight + 3) + "px";
        sideLine.style.top = e.currentTarget.offsetTop + "px";
        underLine.style.left = e.currentTarget.offsetLeft + "px";
        underLine.style.top = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight - 5) + "px";
        underLine.style.width = e.currentTarget.offsetWidth + "px";
    }
        
    filterList = []
    if(mode === "all"){
        render();
    } else if(mode === "ongoing"){
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render()
    } else if(mode === "complete"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render()
    }
}