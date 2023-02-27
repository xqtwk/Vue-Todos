<script setup lang="ts">
import { ref, reactive } from "vue";
import type { TodoStatus, Todo } from "@/types";
import useTodos from "@/store/useTodos";

interface Props {
  status: TodoStatus;
}

const props = defineProps<Props>();
const displayForm = ref(false);

const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
  title: "",
  description: "",
  status: props.status,
});

const resetForm = () => {
  displayForm.value = false;
  newTodo.title = "";
  newTodo.description = "";
};

const handleOnSubmit = () => {
  addNewTodo({
    id: Math.floor(Math.random() * 100000000 + 1),
    ...newTodo,
  });
  resetForm();
};
</script>

<template>
  <div class="new-todo">
    <h3 v-if="!displayForm" @click="displayForm = !displayForm">Add new</h3>
    <template v-else>
      <form @submit.prevent="handleOnSubmit">
        <div>
          <input type="text" placeholder="Title" v-model="newTodo.title" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            v-model="newTodo.description"
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </template>
  </div>
</template>
