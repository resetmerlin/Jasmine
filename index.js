import { convertHTMLToCreateElement } from "./src/Converter";
import { init } from "./src/Init";
import { patch } from "./src/Patch";
import { render } from "./src/Render";

const htmlString = `
<div class="container">
  <div class="todolists__wrapper">
    <div class="todolists__title">
      <h2>TODO LIST</h2>
    </div>
    <button class="button" type="button" id="add__button">
      Add
    </button>
    <div class="todolists__content"></div>
  </div>
</div>;`;

console.log(htmlString.trim());

const vDom = convertHTMLToCreateElement(htmlString.trim());

init(document.getElementById("app"), render(vDom), vDom);

const $addTodoListButton = document.querySelector("#add__button");
const $todoListContent = document.querySelector(".todolists__content");

$addTodoListButton.addEventListener("click", addTodoList);

let todoLists = [];

function renderTodoList() {
  $todoListContent.innerHTML = todoLists
    .map((todoList) =>
      todoListView(todoList.title, todoList.subtitle, todoList.order)
    )
    .join("");

  patch(
    document.getElementById(
      "app",
      convertHTMLToCreateElement($todoListContent.outerHTML)
    )
  );

  todoLists.forEach((todoList) => {
    const form = document.querySelector(`#form-${todoList.order}`);
    form.addEventListener("submit", (e) => editTodoList(e, todoList.order));

    const deleteButton = document.querySelector(`#delete-${todoList.order}`);
    deleteButton.addEventListener("click", () =>
      deleteTodoList(todoList.order)
    );
  });
}

function addTodoList() {
  const dummyData = {
    order: todoLists?.length ? todoLists[todoLists.length - 1].order + 1 : 0,
    title: "You can delete it",
    subtitle: "Edit via delete button",
  };

  todoLists = [...todoLists, dummyData];

  renderTodoList();
}

function deleteTodoList(order) {
  todoLists = [...todoLists].filter((todoList) => order !== todoList.order);

  renderTodoList();
}

function editTodoList(event, order) {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  const title = dataObject.title;
  const subtitle = dataObject.subtitle;

  if (!title && !subtitle) return;

  todoLists = todoLists.map((todoList) => {
    if (todoList.order === order) {
      return { ...todoList, title, subtitle };
    }
    return todoList;
  });

  renderTodoList();
}

function todoListView(title, subtitle, order) {
  // Note: Removed deleteTodoList argument since it's not directly used here
  return `
    <form id="form-${order}" class="todolist">
        <div>
          <label class="checkbox path">
              <input type="checkbox" />
              <svg viewBox="0 0 21 21">
                  <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186" />
              </svg>
          </label>
        </div>
        <div>
              <input
                  class="title"
                  placeholder=${title}
                  id="title"
                  name="title" 
              />
              <input
                  class="subtitle"
                  placeholder=${subtitle}
                  id="subtitle"
                  name="subtitle" 
              />
      </div>    
        <button type="submit" class='button'>Edit</button>
        <button type="button" id="delete-${order}" class='button'>Delete</button>
    </form>`;
}
