import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ModalType } from '../../models/Modal';

const initialState: ModalType = {
  active: false,
  listId: undefined,
  todoId: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // modal
    openTodoModal: (
      state,
      action: PayloadAction<{ listId: number; todoId: number }>
    ) => {
      const { listId, todoId } = action.payload;
      state.active = true;
      state.listId = listId;
      state.todoId = todoId;
    },
    openListModal: (state, action: PayloadAction<{ listId: number }>) => {
      const { listId } = action.payload;
      state.active = true;
      state.listId = listId;
      state.todoId = undefined;
    },
    closeModal: (state) => {
      state.active = false;
      state.listId = undefined;
      state.todoId = undefined;
    },
  },
});

export const { openListModal, openTodoModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
