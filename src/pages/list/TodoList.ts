import "./todoList.css";
import useTodoList from "./useTodoList";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router";
import sortItems from "../../utils/sortItems";
import useSelectTodoList from "../../apis/useSelectTodoList";
import useUpdateTodoInfoDone from "../../apis/useUpdateTodoInfoDone";

const TodoList = async function () {
  const { changeCheckboxState, dropTodo } = useTodoList();
  let todoListData = await useSelectTodoList();

  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.className = "list";

  const containerList = document.createElement("div");
  containerList.setAttribute("id", "container-list");

  const contentDone = document.createElement("div");
  const contentNotDone = document.createElement("div");
  contentDone.setAttribute("id", "content-done");
  contentNotDone.setAttribute("id", "content-not-done");

  try {
    // let currentDropdown = "createdAt_asc";

    // function createDropdown(parentElement) {
    //   const sortDropdown = document.createElement("select");

    //   const option1 = new Option("생성날짜 오래된순", "createdAt_desc");
    //   const option2 = new Option("생성날짜 최신순", "createdAt_asc");

    //   sortDropdown.appendChild(option1);
    //   sortDropdown.appendChild(option2);

    //   sortDropdown.value = currentDropdown;

    //   sortDropdown.addEventListener("change", (e) => {
    //     currentDropdown = e.target.value;
    //     const [key, order] = e.target.value.split("_");
    //     makeTodolist(response.data.items);
    //   });

    //   parentElement.appendChild(sortDropdown);
    // }

    // function createSectionTitle(title, parentElement) {
    //   const h3Element = document.createElement("h3");
    //   h3Element.textContent = title;
    //   parentElement.appendChild(h3Element);
    // }

    // createSectionTitle("Done", contentDone);
    // createSectionTitle("Todo", contentNotDone);

    // makeTodolist(response.data.items);

    // drag & drop event 추가
    contentDone.ondragover = (e) => e.preventDefault();
    contentDone.ondrop = (e) => dropTodo({ e, isDone: true });
    contentNotDone.ondragover = (e) => e.preventDefault();
    contentNotDone.ondrop = (e) => dropTodo({ e, isDone: false });

    // createDropdown(containerList);
    // function makeTodolist(items) {
    //   contentDone.innerHTML = "";
    //   contentNotDone.innerHTML = "";
    //   createSectionTitle("Done", contentDone);
    //   createSectionTitle("Todo", contentNotDone);

    //   let countNotDone = 0;
    //   let countDone = 0;

    //   const countDoneElement = document.createElement("span");
    //   const countNotDoneElement = document.createElement("span");
    //   contentDone.appendChild(countDoneElement);
    //   contentNotDone.appendChild(countNotDoneElement);

    //   sortItems(items).forEach(function (item) {
    //     const title = document.createTextNode(item.title);

    //     const li = document.createElement("div");
    //     li.draggable = true;
    //     li.id = item._id;
    //     li.ondragstart = (e) => {
    //       e.dataTransfer.setData("text/plain", e.target.id);
    //     };

    //     //상세페이지 이동을 위한 a태그 속성
    //     const todoInfoLink = document.createElement("a");
    //     todoInfoLink.setAttribute("id", item._id);
    //     todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
    //     todoInfoLink.appendChild(title);
    //     todoInfoLink.addEventListener("click", function (event) {
    //       event.preventDefault();
    //       linkTo(todoInfoLink.getAttribute("href"));
    //     });

    //     // todo item의 checkbox 속성
    //     const checkbox = document.createElement("input");
    //     checkbox.setAttribute("id", item._id);
    //     checkbox.setAttribute("type", "checkbox");
    //     checkbox.setAttribute("name", "checkbox");
    //     checkbox.setAttribute("checked", false);
    //     checkbox.checked = item.done;
    //     li.appendChild(checkbox);
    //     li.appendChild(todoInfoLink);
    //     checkbox.addEventListener("click", async (e) => {
    //       changeCheckboxState(e);
    //       todoListData = await useSelectTodoList();
    //       makeTodolist(todoListData?.items);
    //     });

    //     if (item.done) {
    //       contentDone.appendChild(li);
    //       countDone++;
    //     } else {
    //       contentNotDone.appendChild(li);
    //       countNotDone++;
    //     }
    //   });

    //   countDoneElement.textContent = `완료된 할 일 ${countDone}개`;
    //   countNotDoneElement.textContent = `해야할 할 일 ${countNotDone}개`;
    // }

    //TODO:임시코드

    //     //상세페이지 이동을 위한 a태그 속성
    const li = document.createElement("div");
    li.draggable = true;
    li.id = todoListData!.items[0]._id;
    // li.ondragstart = (e) => {
    //   e.dataTransfer.setData("text/plain", e.target.id);
    // };

    const title = document.createTextNode(todoListData!.items[0].title);
    const todoInfoLink = document.createElement("a");
    todoInfoLink.setAttribute("id", todoListData!.items[0]._id);
    todoInfoLink.setAttribute("href", `info?_id=${todoListData!.items[0]._id}`);
    todoInfoLink.appendChild(title);
    todoInfoLink.addEventListener("click", function (event) {
      event.preventDefault();
      linkTo(todoInfoLink.getAttribute("href"));
    });

    // todo item의 checkbox 속성
    const checkbox = document.createElement("input");
    checkbox.setAttribute("id", todoListData!.items[0]._id);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "checkbox");
    // checkbox.checked = todoListData!.items[0].done;
    // li.appendChild(checkbox);
    // li.appendChild(todoInfoLink);
    // checkbox.addEventListener("click", async (e) => {
    //   changeCheckboxState(e);
    //   todoListData = await useSelectTodoList();
    //   makeTodolist(todoListData?.items);
    // });

    //등록 버튼
    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    page.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      linkTo("regist");
    });

    li.appendChild(todoInfoLink);
    containerList.appendChild(li);
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    page.appendChild(error);
  }

  page.appendChild(Header("TODO App 목록 조회"));
  page.appendChild(containerList);
  page.appendChild(contentDone);
  page.appendChild(contentNotDone);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
