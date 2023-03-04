import { FC, useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { addNewList } from '../app/slices/lists/lists.thunk';

import AddIcon from '../assets/add.svg';

type ListFormProps = {};

const ListForm: FC<ListFormProps> = ({}: ListFormProps) => {
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();

  function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(addNewList({ title }));
    setTitle('');
  }

  return (
    <div className="min-w-72 mx-2 mt-4 flex h-36 w-72 flex-col rounded-md bg-sky-200 px-2 py-4">
      <form
        className="flex justify-between rounded-md bg-white p-2"
        onSubmit={submitHandler}
      >
        <input
          className="mr-2 w-full p-1 text-2xl font-bold"
          type="text"
          placeholder="New List..."
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

export default ListForm;
