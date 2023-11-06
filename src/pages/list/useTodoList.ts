import useSelectTodoList, { TodoInfo } from "../../apis/useSelectTodoList";
import useUpdateTodoInfoDone from "../../apis/useUpdateTodoInfoDone";
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
  return { changeCheckboxState, dropTodo, clickCheckbox };
};

export default useTodoList;
export type { CheckboxChangeEvent };
