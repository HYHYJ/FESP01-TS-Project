import { TodoInfo } from "../apis/useSelectTodoList";

interface Props {
  items: TodoInfo[];
  order: string;
}

export default function sortItems({ items, order }: Props): TodoInfo[] {
  if (items.length === 0){
    return items;
  }
  else { 
    return items.sort((a, b) => {
    if (order === "asc") {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    } else {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
    }
  });
  }
}
