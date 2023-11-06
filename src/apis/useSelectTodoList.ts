import axios from "axios";
type todoInfo = {
  _id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

type todoList = {
  ok: number;
  items: todoInfo[];
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
    return response.data as todoList;
  } catch (err) {
    console.error(err);
  }
}

export type { todoInfo, todoList };
