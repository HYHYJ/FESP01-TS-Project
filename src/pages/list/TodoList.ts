import "./todoList.css";
import useTodoList, { CheckboxChangeEvent } from "./useTodoList";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router";
import sortItems from "../../utils/sortItems";
import useSelectTodoList from "../../apis/useSelectTodoList";
import handleDateForm from "../../utils/handleDateForm";

const TodoList = async function () {
  //함수
  const { changeCheckboxState, dropTodo, clickCheckbox } = useTodoList();

  //data
  let todoListData = await useSelectTodoList();
  let notDoneList = todoListData?.items.filter((el) => el.done == false);
  let doneList = todoListData?.items.filter((el) => el.done == true);

  //page
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.className = "list";

  //main
  const containerList = document.createElement("div");
  containerList.setAttribute("id", "container-list");

  //section
  const contentDone = document.createElement("div");
  const contentNotDone = document.createElement("div");
  contentDone.setAttribute("id", "content-done");
  contentNotDone.setAttribute("id", "content-not-done");

  try {
    // todo 목록
    notDoneList?.forEach((todo) => {
      const li = document.createElement("div");
      li.draggable = true;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${todo._id}`;
      checkbox.addEventListener("click", clickCheckbox);
      li.appendChild(checkbox);

      const a = document.createElement("a");
      a.id = `${todo._id}`;
      a.href = `info?_id=${todoListData!.items[0]._id}`;

      const text = document.createTextNode(todo.title);
      const createdAt = document.createTextNode(
        `(${handleDateForm(todo.createdAt)})`
      );
      a.appendChild(text);
      a.appendChild(createdAt);

      li.appendChild(a);
      contentNotDone.appendChild(li);
    });

    //done 목록
    doneList?.forEach((todo) => {
      const li = document.createElement("div");
      li.draggable = true;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${todo._id}`;
      checkbox.checked = true;
      checkbox.addEventListener("click", clickCheckbox);
      li.appendChild(checkbox);

      const a = document.createElement("a");
      a.id = `${todo._id}`;
      a.href = `info?_id=${todoListData!.items[0]._id}`;

      const text = document.createTextNode(todo.title);
      const createdAt = document.createTextNode(
        `(${handleDateForm(todo.createdAt)})`
      );
      a.appendChild(text);
      a.appendChild(createdAt);

      li.appendChild(a);
      contentDone.appendChild(li);
    });

    // 정렬
    const selectBox = document.createElement("select");
    selectBox.id = "sort-box";

    //option
    const optionAsc = new Option("최신순", "createdAt_desc");
    const optionDesc = new Option("오래된순", "createdAt_asc");

    selectBox.appendChild(optionAsc);
    selectBox.appendChild(optionDesc);

    containerList.appendChild(selectBox);

    //drop

    // let currentDropdown = "createdAt_asc";

    // function createDropdown(parentElement) {
    // const sortDropdown = document.createElement("select");

    // const option1 = new Option("생성날짜 오래된순", "createdAt_desc");
    // const option2 = new Option("생성날짜 최신순", "createdAt_asc");

    // sortDropdown.appendChild(option1);
    // sortDropdown.appendChild(option2);

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

    //등록 버튼
    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    page.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      linkTo("regist");
    });
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
