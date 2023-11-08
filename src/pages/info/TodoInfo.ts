import "./todoInfo.css";
import axios from "axios";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router";
import handleDateForm from "../../utils/handleDateForm";
import getId from "../../utils/getId";
import useSelectTodoInfo from "../../apis/useSelectTodoInfo";
import useUpdateTodoInfo from "../../apis/useUpdateTodoInfo";

const TodoInfo = async function (): Promise<HTMLElement> {
  //주소에서 id 가져오기
  const ID: string | null = getId();
  const data: TodoInfo = await useSelectTodoInfo(ID);
  const item: TodoInfoItem = data.item;

  //page
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.className = "info";

  //본문
  const main = document.createElement("main");
  const infoContentsSection = document.createElement("section");
  const infoButtonsSection = document.createElement("section");
  infoContentsSection.id = "info-contents-section";
  infoButtonsSection.id = "info-buttons-section";
  main.appendChild(infoContentsSection);
  main.appendChild(infoButtonsSection);

  //할 일 제목
  const infoTitle = document.createElement("h2");
  infoTitle.id = "info-todo-title";
  infoTitle.textContent = `할 일 : ${item.title}`;
  infoContentsSection.appendChild(infoTitle);

  //상세 내용
  const infoContentTitle: HTMLElement = document.createElement("h3"); // label 이였음
  infoContentTitle.textContent = "상세 내용";
  // infoContentTitle.setAttribute("for", "info-todo-label");
  // infoContentTitle.for = "info-todo-content";

  const infoContent = document.createElement("p");
  // infoContent.id = "info-todo-content";
  infoContent.setAttribute("id", "info-todo-content");
  infoContent.textContent = item.content as string;
  infoContentsSection.appendChild(infoContentTitle);
  infoContentsSection.appendChild(infoContent);

  //생성시간
  const infoCreateTime = document.createElement("p");
  infoCreateTime.id = "info-create-time";
  infoCreateTime.textContent = `생성일 : ${handleDateForm(item.createdAt)}`;
  infoContentsSection.appendChild(infoCreateTime);

  //수정시간
  const infoUpdateTime = document.createElement("p");
  infoUpdateTime.id = "info-update-time";
  infoUpdateTime.textContent = `수정일 : ${handleDateForm(item.updatedAt)}`;
  infoContentsSection.appendChild(infoUpdateTime);

  //완료여부(체크박스)
  const checkboxDetail = document.createElement("input");
  checkboxDetail.setAttribute("id", "checkbox");
  checkboxDetail.type = "checkbox";

  checkboxDetail.checked = item.done as boolean;
  infoContentsSection.appendChild(checkboxDetail);
  checkboxDetail.addEventListener("click", () =>
    useUpdateTodoInfo({ ...(item as TodoItem), done: checkboxDetail.checked })
  );
  //수정하기 버튼
  const btnModify = document.createElement("button");
  btnModify.textContent = "수정";
  btnModify.id = "info-btn-modify";
  infoButtonsSection.appendChild(btnModify);
  btnModify.addEventListener("click", function (event: MouseEvent) {
    event.preventDefault();
    linkTo(`update?_id=${ID}`);
  });

  //삭제하기 버튼
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "삭제";
  btnDelete.id = "info-btn-delete";
  infoButtonsSection.appendChild(btnDelete);
  btnDelete.addEventListener("click", function (event: MouseEvent) {
    event.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      axios.delete(`http://localhost:33088/api/todolist/${ID}`);
      window.location.replace("/");
    }
  });

  //홈 버튼
  const btnGoHome = document.createElement("button");
  btnGoHome.textContent = "홈으로 이동";
  btnGoHome.id = "info-btn-home";
  btnGoHome.onclick = (event: MouseEvent) => {
    event.preventDefault();
    linkTo("/");
  };
  infoButtonsSection.appendChild(btnGoHome);

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(main);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
