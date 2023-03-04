import { FC, useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteList, updateList } from '../app/slices/lists/lists.thunk';

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
    dispatch(deleteList({ id: list.id }));
  }

  function titleChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTitle(event.currentTarget.value);
  }

  function titleSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(updateList({ id: list.id, title }));
    setEdit(false);
  }

  return (
    <>
      {edit ? (
        <form className="flex flex-col" onSubmit={titleSubmitHandler}>
          <textarea
            className="p-1 text-2xl font-bold group-hover:text-stone-200"
            value={title}
            onChange={titleChangeHandler}
          />
          <button
            className="mt-2 self-end rounded-md bg-blue-600 py-2 px-4"
            type="submit"
          >
            <DoneIcon width={24} height={24} />
          </button>
        </form>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setEdit(true)}
              className="rounded-2xl p-1 hover:bg-yellow-600 "
            >
              <EditIcon width={24} height={24} fill="#000000" />
            </button>
            <button
              onClick={deleteListHandler}
              className=" rounded-2xl p-1 hover:bg-red-600 "
            >
              <DeleteIcon width={24} height={24} fill="#000000" />
            </button>
          </div>
          <div className="min-w-72 mx-2 mt-4 flex w-72 flex-col rounded-md bg-sky-200 px-2 py-4">
            <div className="flex cursor-pointer justify-between rounded-md p-2 hover:bg-blue-600">
              <h2 className="p-1 text-2xl font-bold group-hover:text-stone-200">
                {list.title}
              </h2>
            </div>
            <ul>
              {list.todos.map((todo) => (
                <Todo todo={todo} listId={list.id} key={Math.random()} />
              ))}
              <TodoForm listId={list.id} />
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default ListModal;
