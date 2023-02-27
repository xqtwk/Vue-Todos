<script setup lang="ts">
import { TodoStatus } from "@/types";
import useTodos from "@/store/useTodos";
import Draggable from "vuedraggable";
import NewTodo from "./NewTodo.vue";
("./NewTodo.vue");
interface Props {
  status: TodoStatus;
}
const props = defineProps<Props>();

const { getTodosByStatus, deleteTodo, updateTodo } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
  [TodoStatus.Pending]: "Pending",
  [TodoStatus.InProgress]: "In Progress",
  [TodoStatus.Completed]: "Completed",
};

const onDraggableChange = (payload: any) => {
  if (payload?.added?.element?.status) {
    updateTodo(payload?.added?.element, props.status);
  }
};
</script>
<template>
  <div class="group-wrapper">
    <h3>{{ groupLabel[props.status] }}</h3>
    <hr />
    <Draggable
      class="draggable"
      :list="todoList"
      group="todos"
      itemKey="id"
      @change="onDraggableChange"
    >
      <template #item="{ element: todo }">
        <li>
          {{ todo.title }}
          {{ todo.status }}
          <span class="delete-icon" @click="deleteTodo(todo)">x</span>
          <p>
            <span class="todo-description">{{ todo.description }}</span>
          </p>
        </li>
      </template>
    </Draggable>
    <NewTodo :status="props.status" />
  </div>
</template>

<style scoped>
.delete-icon {
  color: white;
  float: right;
  cursor: pointer;
}
.new-todo {
  margin-top: auto;
}
hr {
  border-color: var(--vt-c-text-dark-2);
  margin-top: 10%;
  margin-bottom: 10%;
}
.group-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  background-color: var(--vt-c-black-soft);
}

.group-wrapper li,
.new-todo {
  list-style-type: none;
  cursor: grab;
  margin-bottom: 5%;
  background-color: var(--vt-c-divider-light-1);
}

.todo-description {
  font-size: 12px;
}

.draggable {
  min-height: 50%;
}
</style>
