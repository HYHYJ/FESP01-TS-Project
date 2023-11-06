import axios from "axios";
type TodoInfo = {
  _id: number;
  title: string;
  content: string;
  done: boolean | true | false;
  createdAt: string;
  updatedAt: string;
};

type TodoList = {
  ok: number;
  items: TodoInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default async function useSelectTodoList() {
  try {
    const response = await axios("http://localhost:33088/api/todolist");
    return response.data as TodoList;
  } catch (err) {
    console.error(err);
  }
}

export type { TodoInfo, TodoList };
