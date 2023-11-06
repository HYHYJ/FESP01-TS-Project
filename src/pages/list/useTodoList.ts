import useSelectTodoList, { TodoInfo } from "../../apis/useSelectTodoList";
import useUpdateTodoInfoDone from "../../apis/useUpdateTodoInfoDone";
import handleDateForm from "../../utils/handleDateForm";
type CheckboxChangeEvent = {
  target: HTMLInputElement;
} & Event &
  MouseEvent;

type DropEvent = {
  dataTransfer: DataTransfer | null;
} & DragEvent &
  Event;

type DropTodo = {
  e: DropEvent;
  isDone: boolean;
};

interface useTodoList {
  changeCheckboxState: (e: CheckboxChangeEvent) => void;
  dropTodo: ({ e, isDone }: DropTodo) => void;
  clickCheckbox: (e: MouseEvent) => Promise<void>;
  appendTodo: ({
    parentContent,
    todo,
  }: {
    parentContent: HTMLUListElement;
    todo: TodoInfo;
  }) => void;
}

const useTodoList = (): useTodoList => {
  /**
   * 체크박스 클릭시 상태 변경값 서버로 전송
   * @param e 체크박스 누르는 이벤트
   */
  const changeCheckboxState = async (e: CheckboxChangeEvent) => {
    const checkbox = e.target;
    const id = checkbox.id;
    const isChecked = e.target.checked;

    await useUpdateTodoInfoDone({ id: id, isDone: isChecked });
  };

  /**
   * 드롭 이벤트 발생 시 done 상태변경 값을 서버로 전송
   * @param e dropdown event
   * @param isDone done true/false
   */
  const dropTodo = async ({ e, isDone }: DropTodo) => {
    e.preventDefault();
    if (e !== null) {
      const id = e.dataTransfer!.getData("text/plain");
      await useUpdateTodoInfoDone({ id, isDone });
    }
  };

  const clickCheckbox = async (e: MouseEvent) => {
    //api요청
    changeCheckboxState(e as CheckboxChangeEvent);
    //rerender
    location.reload();
  };

  /**
   *   투두 리스트를 만들어주는 함수
   * @param parentContent todo list 가 append 될 section
   * @param todo todo의 data
   */
  const appendTodo = ({
    parentContent,
    todo,
  }: {
    parentContent: HTMLUListElement;
    todo: TodoInfo;
  }) => {
    //리스트
    const li = document.createElement("div");
    li.className = `todo-li-${todo._id}`;
    li.draggable = true;

    //체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `${todo._id}`;
    checkbox.checked = todo.done;
    checkbox.addEventListener("click", clickCheckbox);
    li.appendChild(checkbox);

    //링크
    const a = document.createElement("a");
    a.id = `${todo._id}`;
    a.href = `info?_id=${todo._id}`;

    //링크가 걸리는 텍스트
    const text = document.createTextNode(todo.title);
    const createdAt = document.createTextNode(
      `(${handleDateForm(todo.createdAt)})`
    );
    a.appendChild(text);
    a.appendChild(createdAt);

    //contentDone/contentNotDone section을 결정하는 부분
    li.appendChild(a);
    parentContent.appendChild(li);
  };

  return { changeCheckboxState, dropTodo, clickCheckbox, appendTodo };
};

export default useTodoList;
export type { CheckboxChangeEvent };
