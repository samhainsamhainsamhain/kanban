import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '../hooks';

import { ListType } from '../../models/List';
import { TodoType } from '../../models/Todo';

const initialState: ListType[] = [
  {
    id: 123434,
    title: 'movies',
    todos: [
      { id: 164564, title: 'cars', status: false },
      {
        id: 2231,
        title: 'shreck',
        status: false,
        description:
          'shrek 2 is a cool movie and i want to watch it again and again!',
      },
    ],
  },
  {
    id: 24563,
    title: 'books',
    todos: [
      { id: 164557, title: 'war and peace', status: false },
      { id: 23643, title: 'song of ice and fire', status: false },
    ],
  },
];
const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // lists
    createList: (state, action: PayloadAction<string>) => {
      state.push({
        id: Math.random(),
        title: action.payload,
        todos: [],
      });
    },
    updateList: (
      state,
      action: PayloadAction<{ listId: number; newTitle: string }>
    ) => {
      const { listId, newTitle } = action.payload;

      const listIndex = state.findIndex((list) => list.id === listId);

      state[listIndex].title = newTitle;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state = state.filter((list) => list.id !== action.payload);
    },
    // todos
    createTodo: (
      state,
      action: PayloadAction<{
        todoTitle: string;
        listId: number;
      }>
    ) => {
      const { listId, todoTitle } = action.payload;
      const list = state.find((l) => l.id === listId);

      if (!list) return;

      list.todos.push({
        id: Math.random(),
        title: todoTitle,
        status: false,
      });
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ listId: number; todoId: number }>
    ) => {
      const { listId, todoId } = action.payload;
      const list = state.find((l) => l.id === listId);

      if (!list) return;

      const todoIndex = list.todos.findIndex((todo) => todo.id === todoId);
      list.todos.splice(todoIndex, 1);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ listId: number; newTodo: TodoType }>
    ) => {
      const { listId, newTodo } = action.payload;

      const listIndex = state.findIndex((list) => list.id === listId);

      const todoIndex = state[listIndex].todos.findIndex(
        (todo) => todo.id === newTodo.id
      );

      state[listIndex].todos[todoIndex] = newTodo;
    },
  },
});

export const selectAllLists = () => useAppSelector((state) => state.lists);

export const selectById = (id: number) =>
  useAppSelector((_) => {
    const lists = selectAllLists();

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];

      if (list.id === id) return list;

      for (let y = 0; y < list.todos.length; y++) {
        if (list.todos[y].id === id) return list.todos[y];
      }
    }
  });

export const {
  createList,
  updateList,
  deleteList,
  createTodo,
  updateTodo,
  deleteTodo,
} = listsSlice.actions;
export default listsSlice.reducer;
