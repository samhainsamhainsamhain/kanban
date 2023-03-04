import { createSlice } from '@reduxjs/toolkit';

import { useAppSelector } from '../../hooks';

import {
  fetchLists,
  addNewList,
  updateList,
  deleteList,
  createTodo,
  deleteTodo,
  updateTodo,
} from './lists.thunk';

import { ListType } from '../../../models/List';

type ListsSliceType = {
  lists: ListType[];
  isLoading: boolean;
  error: null | string;
};

const initialState: ListsSliceType = {
  lists: [],
  isLoading: false,
  error: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // REDUCERS FOR LOCAL USE
    // LISTS
    //
    // createList: (state, action: PayloadAction<string>) => {
    //   state.lists.push({
    //     id: Math.random().toString(),
    //     title: action.payload,
    //     todos: [],
    //   });
    // },
    // updateList: (
    //   state,
    //   action: PayloadAction<{ listId: string; newTitle: string }>
    // ) => {
    //   const { listId, newTitle } = action.payload;
    //   const listIndex = state.lists.findIndex((list) => list.id === listId);
    //   state.lists[listIndex].title = newTitle;
    // },
    // deleteList: (state, action: PayloadAction<string>) => {
    //   state.lists = state.lists.filter((list) => list.id !== action.payload);
    // },
    //
    // TODOS
    //
    // createTodo: (
    //   state,
    //   action: PayloadAction<{
    //     todoTitle: string;
    //     listId: string;
    //   }>
    // ) => {
    //   const { listId, todoTitle } = action.payload;
    //   const list = state.lists.find((l) => l.id === listId);
    //   if (!list) return;
    //   list.todos.push({
    //     id: Math.random().toString(), // TODO remove this, we get id from server response
    //     title: todoTitle,
    //     status: false,
    //   });
    // },
    // deleteTodo: (
    //   state,
    //   action: PayloadAction<{ listId: string; todoId: string }>
    // ) => {
    //   const { listId, todoId } = action.payload;
    //   const list = state.lists.find((l) => l.id === listId);
    //   if (!list) return;
    //   const todoIndex = list.todos.findIndex((todo) => todo.id === todoId);
    //   list.todos.splice(todoIndex, 1);
    // },
    // updateTodo: (
    //   state,
    //   action: PayloadAction<{ listId: string; newTodo: TodoType }>
    // ) => {
    //   const { listId, newTodo } = action.payload;
    //   const listIndex = state.lists.findIndex((list) => list.id === listId);
    //   const todoIndex = state.lists[listIndex].todos.findIndex(
    //     (todo) => todo.id === newTodo.id
    //   );
    //   state.lists[listIndex].todos[todoIndex] = newTodo;
    // },
  },
  extraReducers: (builder) =>
    builder
      // LISTS
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = [...action.payload];
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists.push(action.payload);
      })
      .addCase(addNewList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const { id, title } = action.payload;

        const listIndex = state.lists.findIndex((list) => list.id === id);
        const list = state.lists[listIndex];

        list.title = title;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const { id } = action.payload;

        state.lists = state.lists.filter((list) => list.id !== id);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      // TODOS
      .addCase(createTodo.fulfilled, (state, action) => {
        const { list: listRes, ...todo } = action.payload;
        const list = state.lists.find((l) => l.id === listRes.id);

        if (!list) return;

        list.todos.push({
          ...todo,
        });
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { list, ...todo } = action.payload;

        const listIndex = state.lists.findIndex((l) => l.id === list.id);

        const todoIndex = state.lists[listIndex].todos.findIndex(
          (todo) => todo.id === action.payload.id
        );

        state.lists[listIndex].todos[todoIndex] = todo;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { id, listId } = action.payload;

        const list = state.lists.find((l) => l.id === listId);

        if (!list) return;

        const todoIndex = list.todos.findIndex((todo) => todo.id === id);

        list.todos.splice(todoIndex, 1);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Server error';
      }),
});

export const selectAllLists = () =>
  useAppSelector((state) => state.lists.lists);

export const selectById = (id: string) =>
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
  // createList,
  // updateList,
  // deleteList,
  // createTodo,
  // updateTodo,
  // deleteTodo,
} = listsSlice.actions;
export default listsSlice.reducer;
