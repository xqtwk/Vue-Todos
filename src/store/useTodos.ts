import { TodoStatus, type Todo } from "@/types";
import { reactive, computed } from "vue";
interface TodoStore {
  [TodoStatus.Pending]: Todo[];
  [TodoStatus.InProgress]: Todo[];
  [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
  [TodoStatus.Pending]: [
    {
      id: 1,
      title: "Learn Vuejs",
      description: "Trying to..",
      status: TodoStatus.Pending,
    },
  ],
  [TodoStatus.InProgress]: [
    {
      id: 2,
      title: "Developing an app",
      description: "In progress",
      status: TodoStatus.InProgress,
    },
  ],
  [TodoStatus.Completed]: [
    {
      id: 3,
      title: "Vuejs part",
      description: "Done",
      status: TodoStatus.Completed,
    },
  ],
};

const todoStore = reactive<TodoStore>(defaultVal);

export default () => {
  const getTodosByStatus = (TodoStatus: TodoStatus) => {
    return computed(() => todoStore[TodoStatus]);
  };

  const addNewTodo = (todo: Todo) => {
    todoStore[todo.status].push(todo);
  };

  const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
    todo.status = newStatus;
  };

  const deleteTodo = (todoToDelete: Todo) => {
    todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
      (todo) => todo.id !== todoToDelete.id
    );
  };

  return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo };
};
