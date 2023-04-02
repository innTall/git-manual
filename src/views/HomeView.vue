<script setup>
import Spinner from '../components/Spinner.vue';
import AddTodoInput from '../components/AddTodoInput.vue';
import TodoItem from '../components/TodoItem.vue';
import { useAuth } from '../store/auth.js';
import { useQuery } from '@vue/apollo-composable';
import { TODOS } from '../graphql/queries.js';

const { currentUser, logout } = useAuth();
const { loading, result } = useQuery(TODOS);
</script>

<template>
  <div class="mt-20 w-full max-w-lg mx-auto">
    <h1 class="text-4xl font-bold text-center">Todo App</h1>
    <div class="mt-10 flex items-center justify-between">
      <div>
        Hey <span class="font-bold">{{ currentUser.name }}</span>
      </div>
      <button class="cursor-pointer text-gray-200 hover:text-white" @click="logout">
        Log out
      </button>
    </div>
    <div class="mt-2.5">
      <AddTodoInput />
      <div class="mt-3.5">
        <div v-if="loading" class="mt-10 flex items-center justify-center text-xl font-medium">
          <Spinner class="w-5 mr-2.5" />
          Loading Todos
        </div>
        <div v-else-if="result.todos.length > 0" class="space-y-2.5">
          <TodoItem v-for="todo in result.todos" :key="todo.id" :todo="todo" />
        </div>
        <div v-else class="mt-10 text-center text-blue-50 text-opacity-40">
          Your Todo List is Empty
        </div>
      </div>
    </div>
  </div>
</template>