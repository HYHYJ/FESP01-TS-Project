import useSelectTodoList, { todoList } from "../../apis/useSelectTodoList";
import useUpdateTodoInfoDone from "../../apis/useUpdateTodoInfoDone";
type CheckboxChangeEvent = {
  target: HTMLInputElement;
} & Event;

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
}

const useTodoList = (): useTodoList => {
  const changeCheckboxState = async (e: CheckboxChangeEvent) => {
    const checkbox = e.target;
    const id = checkbox.id;
    const isChecked = e.target.checked;

    await useUpdateTodoInfoDone({ id: id, isDone: isChecked });
  };

  const dropTodo = async ({ e, isDone }: DropTodo) => {
    e.preventDefault();
    if (e !== null) {
      const id = e.dataTransfer!.getData("text/plain");
      await useUpdateTodoInfoDone({ id, isDone });
    }
  };

  return { changeCheckboxState, dropTodo };
};

export default useTodoList;
