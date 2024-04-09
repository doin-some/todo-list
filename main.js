//유저가 값을 입력
//+버튼을 클릭하면 할일이 추가됨
//delete버튼을 클릭하면 할일이 삭제됨
//check버튼을 누르면 할일이 끝나고 밑줄이 감
//1. check 버튼 클릭 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난 걸로 간주하고 밑줄 숨기기
//진행 중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행 중 탭은 진행중인 아이텐만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let mode = "all"
let filterList = []
addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    })
}

function addTask(){
    let taskContent = taskInput.value;
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    filterList.push(task)
    render();
}

function render(){
    //1. 내가 선택한 탭에 따라서
    let list = []
    if (mode === "all"){
    //all taskList
        list = taskList
    }else if(mode === "ongoing" || mode === "done"){
    //ongoing, done == filterList, doneList
        list = filterList
    }

    //2. 리스트를 달리 보여준다
        let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete === true){
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`
        } else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id:", id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i,1)
        for(let j=0; j<filterList.length; j++){
            if(filterList[j].id === id){
                filterList.splice(j,1)
            }
        }
        render()
        break;
        }
    console.log(taskList);
    }
}

function filter(event){
    mode = event.target.id
    filterList = []
    if(mode === "all"){
    //전체 리스트를 보여준다
        render()
    }else if(mode === "ongoing"){
    //진행 중인 아이템을 보여준다
    //task.isComplete == false
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
        console.log("진행 중", filterList)
    }else if(mode === "done"){
    //task.isComplete == true
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
