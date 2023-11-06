import axios from "axios";


export default async function useUpdateTodoInfo({ _id, title, content, done }) {
  interface Props {
    _id: string;
    title: string;
    content: string;
    done: boolean;
  }
  
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
      done,
    });
  } catch (err) {
    console.log(err);
  }
}
