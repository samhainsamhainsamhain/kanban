import { FC } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteList } from '../app/slices/lists.slice';
import { openListModal } from '../app/slices/modal.slice';

import Todo from './Todo';
import TodoForm from './TodoForm';

import { ListType } from '../models/List';

import DeleteIcon from '../assets/delete.svg';

type ListProps = {
  list: ListType;
};

const List: FC<ListProps> = ({ list }: ListProps) => {
  const dispatch = useAppDispatch();

  function deleteListHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    dispatch(deleteList(list.id));
  }

  function openListModalHandler() {
    dispatch(openListModal({ listId: list.id }));
  }

  return (
    <div className="min-w-72 mx-2 mt-4 flex w-72 flex-col rounded-md bg-sky-200 px-2 py-4">
      <div
        className="focus-within: group flex cursor-pointer justify-between rounded-md p-2 hover:bg-blue-600"
        onClick={openListModalHandler}
      >
        <h2 className="p-1 text-2xl font-bold group-hover:text-stone-200">
          {list.title}
        </h2>

        <div className="flex items-center justify-center">
          <button
            onClick={deleteListHandler}
            className="invisible rounded-2xl p-1 hover:bg-red-600 group-hover:visible"
          >
            <DeleteIcon width={24} height={24} fill="#e7e5e4" />
          </button>
        </div>
      </div>
      <ul>
        {list.todos.map((todo) => (
          <Todo todo={todo} listId={list.id} key={Math.random()} />
        ))}
        <TodoForm listId={list.id} />
      </ul>
    </div>
  );
};

export default List;
