
let dataBase = [];

const createItem = (task,status,index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-index = ${index}>
        <div>${task}</div>
    <input type="button" value="X" data-index = ${index}> 
    `
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const updateDisplay = () => {
    cleanTasks();
    dataBase.forEach( (item, index) => createItem(item.task, item.status, index));
}

const addTask = (event) => {
    const key = event.key;
    const text = event.target.value;
    if(key === 'Enter'){
        dataBase.push({'task' : text , 'status' : ''});
        updateDisplay();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    dataBase.splice(index,1);
    updateDisplay();
}

const updateItem = (index) => {
    dataBase[index].status = dataBase[index].status == '' ? 'checked' : '';
    updateDisplay();
}

const clickItem = (event) => {
    const el = event.target;
    if(el.type === 'button'){
        const index = el.dataset.index;
        removeItem(index);
    } else if(el.type === 'checkbox'){
        const index = el.dataset.index;
        updateItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', addTask);
document.getElementById('todoList').addEventListener('click', clickItem);

updateDisplay();