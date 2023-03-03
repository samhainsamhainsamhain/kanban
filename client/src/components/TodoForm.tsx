import { FC, useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { createTodo } from '../app/slices/lists.slice';

import AddIcon from '../assets/add.svg';

type TodoFormProps = {
  listId: number;
};

const TodoForm: FC<TodoFormProps> = ({ listId }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();

  function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  function todoSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(createTodo({ listId, todoTitle: title }));
    setTitle('');
  }

  return (
    <div className="mt-4">
      <form
        onSubmit={todoSubmitHandler}
        className="flex justify-between rounded-md bg-white p-2"
      >
        <input
          className="mr-2 w-full p-1"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={titleChangeHandler}
        />
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-stone-200"
          type="submit"
          disabled={!title.trim()}
        >
          <AddIcon
            width={24}
            height={24}
            fill={`${title.trim() && '#2563eb'}`}
          />
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
