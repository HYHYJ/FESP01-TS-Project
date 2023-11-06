import axios from "axios";

interface Props {
  id: string;
  isDone: boolean;
}

export default async function useUpdateTodoInfoDone({ id, isDone }: Props) {
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${id}`, {
      done: isDone,
    });
  } catch (err) {
    console.log(err);
  }
}
