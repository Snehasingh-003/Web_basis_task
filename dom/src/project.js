//database to store data 
var todos = [];
// target the elements
var form = document.getElementById("form"); //form assertion
var input = document.getElementById("inputvalue");
var listitems = document.getElementById("items");
var delbtn = document.getElementById("delbtn");
var editbtn = document.getElementById("editbtn");
//adding task
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value;
    var newtask = {
        id: Date.now().toString(),
        task: value,
    };
    todos.push(newtask);
    input.value = "";
    console.log(newtask);
    render();
});
function render() {
    listitems.innerHTML = "";
    for (var i = 0; i < todos.length; i++) {
        var display = todos[i];
        var li = document.createElement("li");
        li.textContent = display.task;
        listitems.append(li);
    }
}
//deleting task
delbtn.addEventListener("click", function (e) {
    todos = [];
    listitems.innerHTML = ""; //empty UI
});
