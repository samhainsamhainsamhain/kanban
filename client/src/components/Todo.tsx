import { FC } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteTodo, updateTodo } from '../app/slices/lists/lists.thunk';
import { openTodoModal } from '../app/slices/modal.slice';

import { TodoType } from '../models/Todo';

import DeleteIcon from '../assets/delete.svg';
import CheckboxIcon from '../assets/checkbox.svg';

type TodoProps = {
  todo: TodoType;
  listId: string;
};

const Todo: FC<TodoProps> = ({ todo, listId }: TodoProps) => {
  const dispatch = useAppDispatch();

  function deleteTodoHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    dispatch(deleteTodo({ listId, id: todo.id }));
  }

  function toggleTodoHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    dispatch(updateTodo({ ...todo, status: !todo.status }));
  }

  function openTodoModalHandler() {
    dispatch(openTodoModal({ todoId: todo.id, listId }));
  }

  return (
    <li
      className="group my-4 flex cursor-pointer justify-between rounded-md bg-slate-100 py-4 px-2 hover:bg-slate-300"
      onClick={openTodoModalHandler}
    >
      <p className={`${todo.status && 'line-through'}`}>{todo.title}</p>
      <div className=" flex h-6 items-center justify-center">
        <button
          onClick={toggleTodoHandler}
          className="invisible rounded-2xl p-1 hover:bg-green-600 group-hover:visible"
        >
          <CheckboxIcon width={24} height={24} />
        </button>
        <button
          onClick={deleteTodoHandler}
          className="invisible rounded-2xl p-1 hover:bg-red-600 group-hover:visible"
        >
          <DeleteIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default Todo;
