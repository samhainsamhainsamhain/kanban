import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import listsSlice from './slices/lists/lists.slice';
import modalSlice from './slices/modal.slice';

export const store = configureStore({
  reducer: {
    lists: listsSlice,
    modal: modalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
