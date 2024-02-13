//유저가 값을 입력
//+ 버튼을 클릭하면 할일 추가
// 삭제버튼을 누르면 삭제
//1.체크 버튼을 누르면 true를 - false
//2. true 이면 끝난걸로 간주
//3. false이면 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = []
let filterList = []
let mode = "all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });
  
//필터들 div
for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    })
}

console.log(tabs)

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task) 
    taskInput.value = "";
    render();
}

function render() {
    //선택한 탭에 따라서 리스트를 달리 보여줘야함
    let resultHtml = "";
    let list = [];
    //전체, 진행중, 종료에 따라
    
    if(mode === "all") {
        list = taskList;
        //전체 보여주기
    }else {
        //if(mode === "ongoing" || mode === "done")을 치환
        list = filterList;
    }

    for(let i=0; i < list.length; i++) {
        if(list[i].isComplete) {
            resultHtml +=`<div class="task task-done" id="${list[i].id}">
            <span>${list[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">삭제</button>
        </div>
        </div>`;
        }else {
        resultHtml += `<div class="task" id="${list[i].id}">
        <span>${list[i].taskContent}</span>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">삭제</button>
    </div>
    </div>`;
    }
}

    document.getElementById("task-board").innerHTML = resultHtml;
}

//complete 상태 변경
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            //현재 값의 반대 값을 넣어주기
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log("id :" , id)
    render();
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1)
        }
    }
    //ui도 같이 업데이트 해주기!
    render()
}

function filter(event) {
    console.log("filter", event.target.id)
    filterList = [];
    if (event.target.id === "all") {
        mode = "all";
        underLine.style.left = "0%";
    } else if (event.target.id === "ongoing") {
        mode = "ongoing";
        underLine.style.left = "105px";
    } else if (event.target.id === "done") {
        mode = "done";
        underLine.style.left = "210px";
    }


    if (event.target.id === "all") {
        mode = "all";
    } else if (event.target.id === "ongoing") {
        mode = "ongoing";
    } else if (event.target.id === "done") {
        mode = "done";
    }

    if(mode === "all") {
        //전체
        render();
    }else if(mode === "ongoing") {
        //진행중
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        } render();
    }else if(mode === "done") {
        //완료
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete ){
                filterList.push(taskList[i])
            }
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2,9);
}