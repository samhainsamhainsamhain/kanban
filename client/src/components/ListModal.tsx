import { FC, useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteList, updateList } from '../app/slices/lists.slice';

import { ListType } from '../models/List';

import Todo from './Todo';
import TodoForm from './TodoForm';

import DeleteIcon from '../assets/delete.svg';
import DoneIcon from '../assets/done.svg';
import EditIcon from '../assets/edit.svg';

type ListModalProps = {
  list: ListType;
};

const ListModal: FC<ListModalProps> = ({ list }: ListModalProps) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(list.title);

  const dispatch = useAppDispatch();

  function deleteListHandler() {
    dispatch(deleteList(list.id));
  }

  function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  function titleSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(updateList({ listId: list.id, newTitle: title }));
    setEdit(false);
  }

  return (
    <div className="min-w-72 mx-2 mt-4 flex w-72 flex-col rounded-md bg-sky-200 px-2 py-4">
      {edit ? (
        <form onSubmit={titleSubmitHandler}>
          <input
            className="p-1 text-2xl font-bold group-hover:text-stone-200"
            type="text"
            value={title}
            onChange={titleChangeHandler}
          />
          <button type="submit">
            <DoneIcon width={24} height={24} />
          </button>
        </form>
      ) : (
        <div className="focus-within: group flex cursor-pointer justify-between rounded-md p-2 hover:bg-blue-600">
          <h2 className="p-1 text-2xl font-bold group-hover:text-stone-200">
            {list.title}
          </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setEdit(true)}
              className="invisible rounded-2xl p-1 hover:bg-yellow-600 group-hover:visible"
            >
              <EditIcon width={24} height={24} fill="#e7e5e4" />
            </button>
            <button
              onClick={deleteListHandler}
              className="invisible rounded-2xl p-1 hover:bg-red-600 group-hover:visible"
            >
              <DeleteIcon width={24} height={24} fill="#e7e5e4" />
            </button>
          </div>
        </div>
      )}
      <ul>
        {list.todos.map((todo) => (
          <Todo todo={todo} listId={list.id} key={Math.random()} />
        ))}
        <TodoForm listId={list.id} />
      </ul>
    </div>
  );
};

export default ListModal;
