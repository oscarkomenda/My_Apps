
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
  todo: [],
  completed: []
};



// remove and complete glyphicons
var deleteIcon = '<span class="removeIcon glyphicon glyphicon-trash" aria-hidden="true" alt="delete"></span>';

var doneIcon = '<span class="completeIcon glyphicon glyphicon-ok" aria-hidden="true" alt="done"></span>';

renderTodoList();
// Add button
// if there is any text in the field add that text in ToDo List.
document.getElementById('add').addEventListener("click", function() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});


document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }

});


function addItem (value) {
  addItemToDOM(value);
  document.getElementById('item').value = '';

  data.todo.push(value);
  dataObjectUpdated();
};



function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i =0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {

  localStorage.setItem('todoList', JSON.stringify(data));
}


// Removes an item
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo' ) {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();


  parent.removeChild(item);


}

// Adds a new item to complete list
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;


  if (id === 'todo' ) {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();


  // Check if the item should be added to completed or re-added to todo
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  var list = (completed)? document.getElementById('completed'): document.getElementById('todo');

  var item = document.createElement("li");
  item.innerText = text;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var removeIcon = document.createElement("button");
  removeIcon.classList.add("removeIcon");
  removeIcon.innerHTML = deleteIcon;

  // Add click event for removing item
  removeIcon.addEventListener("click", removeItem);

  var completeIcon = document.createElement("button");
  completeIcon.classList.add("completeIcon");
  completeIcon.innerHTML = doneIcon;

  // Add click event for completing items
  completeIcon.addEventListener("click", completeItem);

  buttons.appendChild(removeIcon);
  buttons.appendChild(completeIcon);
  item.appendChild(buttons);
  todo.appendChild(item);
  list.insertBefore(item, list.childNodes[0]);
}
