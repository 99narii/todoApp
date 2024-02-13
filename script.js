//유저가 값을 입력
//+ 버튼을 클릭하면 할일 추가
// 삭제버튼을 누르면 삭제
//1.체크 버튼을 누르면 true를 - false
//2. true 이면 끝난걸로 간주
//3. false이면 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render();
}

function render() {
    let resultHtml = "";
    for(let i=0; i < taskList.length; i++) {

        if(taskList[i].isComplete == true) {
            resultHtml +=`<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button>삭제</button>
        </div>
        </div>`;
        }else {

        resultHtml += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button>삭제</button>
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
            taskList[i].isComplete = true;
            break;
        }
    }
    console.log("id :" , id)
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2,9);
}