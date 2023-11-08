import "./todoList.css";
import useTodoList from "./useTodoList";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router";
import sortItems from "../../utils/sortItems";
import useSelectTodoList from "../../apis/useSelectTodoList";

const TodoList = async function () {
  //함수
  const { dropTodo, appendTodo } = useTodoList();

  //data
  let todoListData = await useSelectTodoList();
  let notDoneList = todoListData?.items.filter((el) => el.done == false) || [];
  let doneList = todoListData?.items.filter((el) => el.done == true) || [];

  //최신순, 오래된순 정렬 함수
  const sortTodoList = (e: Event) => {
    let targetElement = e.target as HTMLInputElement;

    if (targetElement.value === "createdAt_desc") {
      notDoneList = sortItems({ items: notDoneList, order: "desc" });
      doneList = sortItems({ items: doneList, order: "desc" });
    } else {
      notDoneList = sortItems({ items: notDoneList, order: "asc" });
      doneList = sortItems({ items: doneList, order: "asc" });
    }

    // 기존 view에 있던 목록 삭제
    const parentNotDone = document.getElementById(
      "content-not-done-ul"
    ) as HTMLInputElement;
    const parentDone = document.getElementById(
      "content-done-ul"
    ) as HTMLInputElement;
    parentNotDone.innerHTML = "";
    parentDone.innerHTML = "";

    // 정렬된 todo 목록 append
    notDoneList?.forEach((todo) => {
      appendTodo({ parentContent: contentNotDoneUl, todo: todo });
    });

    // 정렬된 done 목록 append
    doneList?.forEach((todo) => {
      appendTodo({ parentContent: contentDoneUl, todo: todo });
    });
  };

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

  //section title & count
  const notDoneTitle = document.createElement("h2");
  const notDoneTitleText = document.createTextNode("Todo");
  notDoneTitle.appendChild(notDoneTitleText);
  contentNotDone.appendChild(notDoneTitle);

  const doneTitle = document.createElement("h2");
  const doneTitleText = document.createTextNode("Done");
  doneTitle.appendChild(doneTitleText);
  contentDone.appendChild(doneTitle);

  const countNotDoneSpan = document.createElement("span");
  const countNotDoneText = document.createTextNode(
    `해야 할 일: ${notDoneList.length}`
  );
  countNotDoneSpan.appendChild(countNotDoneText);
  contentNotDone.appendChild(countNotDoneSpan);

  const countDoneSpan = document.createElement("span");
  const countDoneText = document.createTextNode(
    `완료된 할 일: ${doneList.length}`
  );
  countDoneSpan.appendChild(countDoneText);
  contentDone.appendChild(countDoneSpan);

  //content ul
  const contentNotDoneUl = document.createElement("ul");
  contentNotDoneUl.id = "content-not-done-ul";
  contentNotDone.appendChild(contentNotDoneUl);

  const contentDoneUl = document.createElement("ul");
  contentDoneUl.id = "content-done-ul";
  contentDone.appendChild(contentDoneUl);

  try {
    //todo 목록
    notDoneList?.forEach((todo) => {
      appendTodo({ parentContent: contentNotDoneUl, todo: todo });
    });

    //done 목록
    doneList?.forEach((todo) => {
      appendTodo({ parentContent: contentDoneUl, todo: todo });
    });

    //정렬 - select
    const selectBox = document.createElement("select");
    selectBox.id = "sort-box";

    //정렬 - option
    const optionAsc = new Option("오래된순", "createdAt_desc");
    const optionDesc = new Option("최신순", "createdAt_asc");
    selectBox.appendChild(optionAsc);
    selectBox.appendChild(optionDesc);
    selectBox.addEventListener("change", sortTodoList);
    containerList.appendChild(selectBox);

    // drag & drop event 추가
    contentDone.ondragover = (e) => e.preventDefault();
    contentDone.ondrop = (e) => dropTodo({ e, isDone: true });
    contentNotDone.ondragover = (e) => e.preventDefault();
    contentNotDone.ondrop = (e) => dropTodo({ e, isDone: false });

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
