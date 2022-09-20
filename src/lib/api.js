import axios from "axios";

export async function getTodos() {
  try {
    const {
      data: { todos },
    } = await axios.get("https://todo-project-be-corecode.onrender.com");
    return todos;
  } catch (_error) {
    return [];
  }
}

export async function updateTodoData(todoId, todoData) {
  try {
    console.log("HERE", todoData);
    await axios.patch(`https://todo-project-be-corecode.onrender.com/${todoId}`, {
      ...todoData,
    });
  } catch ({ response }) {
    console.log(response);
    throw new Error(response.data.message);
  }
}