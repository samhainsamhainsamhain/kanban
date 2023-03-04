import { FC, useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteTodo, updateTodo } from '../app/slices/lists/lists.thunk';

import { TodoType } from '../models/Todo';

import DeleteIcon from '../assets/delete.svg';
import CheckboxIcon from '../assets/checkbox.svg';
import DoneIcon from '../assets/done.svg';
import EditIcon from '../assets/edit.svg';

type TodoModalProps = {
  todo: TodoType;
  listId: string;
};

const TodoModal: FC<TodoModalProps> = ({ todo, listId }: TodoModalProps) => {
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);

  const dispatch = useAppDispatch();

  function deleteTodoHandler() {
    dispatch(deleteTodo({ listId, id: todo.id }));
  }

  function toggleTodoHandler() {
    dispatch(updateTodo({ ...todo, status: !todo.status }));
  }

  function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTodo({ ...newTodo, title: event.currentTarget.value });
  }

  function descriptionChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewTodo({ ...newTodo, description: event.currentTarget.value });
  }

  function titleSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(updateTodo(newTodo));
    setEdit(false);
  }

  return (
    <>
      {edit ? (
        <form className="flex flex-col" onSubmit={titleSubmitHandler}>
          <label htmlFor="Title">Title</label>
          <input
            className="my-2 border-2 border-solid border-black p-1 text-2xl font-bold outline-none"
            type="text"
            id="Title"
            value={newTodo.title}
            onChange={titleChangeHandler}
          />
          <label htmlFor="Description">Description</label>
          <input
            className="my-2 border-2 border-solid border-black p-1 outline-none"
            type="text"
            id="Description"
            value={newTodo.description}
            onChange={descriptionChangeHandler}
          />
          <button type="submit">
            <DoneIcon width={24} height={24} />
          </button>
        </form>
      ) : (
        <>
          <div className="flex h-8 justify-end">
            <button
              onClick={toggleTodoHandler}
              className="rounded-2xl p-1 hover:bg-green-600"
            >
              <CheckboxIcon width={24} height={24} />
            </button>
            <button
              onClick={() => setEdit(true)}
              className="rounded-2xl p-1 hover:bg-yellow-600"
            >
              <EditIcon width={24} height={24} fill="#000000" />
            </button>
            <button
              onClick={deleteTodoHandler}
              className="rounded-2xl p-1 hover:bg-red-600"
            >
              <DeleteIcon width={24} height={24} />
            </button>
          </div>
          <li className="group my-4 flex min-w-[320px] cursor-pointer justify-between rounded-md bg-sky-200 py-4 px-2">
            <div className="w-full">
              <h2 className={`${todo.status && 'line-through'} text-2xl`}>
                {todo.title}
              </h2>
              {todo.description && (
                <p
                  className={`${
                    todo.status && 'line-through'
                  } my-2 w-full max-w-md break-words rounded-md bg-slate-100 p-2`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default TodoModal;
