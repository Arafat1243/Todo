// selectors
const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-btn'),
    todoList = document.querySelector('.todo-list'),
    filterTodo = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('dblclick', editTodo);
filterTodo.addEventListener('click', filterTodos);
// Functions
function addTodo(e) {
    e.preventDefault();
    creatTodos(todoInput.value);
    saveLocalTodo(todoInput.value);
    todoInput.value = '';
}

function creatTodos(value) {
    const todoDiv = document.createElement('div'),
        newTodo = document.createElement('input'),
        completedBtn = document.createElement('button'),
        trashBtn = document.createElement('button');
    todoDiv.classList.add('todo');
    newTodo.disabled = 'disabled';
    newTodo.value = value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodoLocal(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }
    // check Todo
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function editTodo(e) {
    if (e.target.classList.contains('todo-item')) {
        e.target.disabled = '';
        e.target.focus();
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        const todoIndex = todos.indexOf(e.target.value);
        e.target.addEventListener('focusout', () => {
            todos[todoIndex] = e.target.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            e.target.disabled = 'disabled';
            todoList.innerHTML = '';
            todos.forEach(todo => {
                creatTodos(todo);
            });
        });
    }
}

function filterTodos(e) {
    var todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        creatTodos(todo);
    });
}

function removeTodoLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].value;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}