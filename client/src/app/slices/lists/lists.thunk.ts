import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ListType,
  CreateListRequest,
  UpdateListRequest,
  DeleteListRequest,
  DeleteListResponse,
} from '../../../models/List';
import {
  CreateTodoRequest,
  CreateTodoResponse,
  DeleteTodoRequest,
  DeleteTodoResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from '../../../models/Todo';

type ServerError = {
  statusCode: number;
  message: string;
  error: string;
};

// LISTS

export const fetchLists = createAsyncThunk<
  ListType[],
  void,
  { rejectValue: ServerError }
>('lists/fetchLists', async function (_, thunkApi) {
  const response = await fetch('http://localhost:4000/lists');

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return (await response.json()) as ListType[];
});

export const addNewList = createAsyncThunk<
  ListType,
  CreateListRequest,
  { rejectValue: ServerError }
>('lists/addNewList', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return (await response.json()) as ListType;
});

export const updateList = createAsyncThunk<
  ListType,
  UpdateListRequest,
  { rejectValue: ServerError }
>('lists/updateList', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/lists', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return (await response.json()) as ListType;
});

export const deleteList = createAsyncThunk<
  DeleteListResponse,
  DeleteListRequest,
  { rejectValue: ServerError }
>('lists/deleteList', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/lists', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return data;
});

// TODOS

export const createTodo = createAsyncThunk<
  CreateTodoResponse,
  CreateTodoRequest,
  { rejectValue: ServerError }
>('lists/createTodo', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return (await response.json()) as CreateTodoResponse;
});

export const updateTodo = createAsyncThunk<
  UpdateTodoResponse,
  UpdateTodoRequest,
  { rejectValue: ServerError }
>('lists/updateTodo', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/todos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return (await response.json()) as UpdateTodoResponse;
});

export const deleteTodo = createAsyncThunk<
  DeleteTodoResponse,
  DeleteTodoRequest,
  { rejectValue: ServerError }
>('lists/deleteTodo', async function (data, thunkApi) {
  const response = await fetch('http://localhost:4000/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: data.id }),
  });

  if (!response.ok) {
    throw new Error('Server error!');
  }

  if (response.status > 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerError);
  }

  return data;
});
