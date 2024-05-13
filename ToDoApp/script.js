const inputBox = document.getElementById('input-box');
const lisContainer = document.getElementById('listContainer');


function addTask(){
    if(inputBox.value === ''){
        alert('Enter a task to add to the list');
    }
    else{
        let li = document.createElement("li");
        li.innerHTML=inputBox.value;
        lisContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML= "\u00d7";
        li.appendChild(span);
    }
    inputBox.value='';
}