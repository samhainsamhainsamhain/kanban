import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectById } from '../app/slices/lists/lists.slice';
import { closeModal } from '../app/slices/modal.slice';

import { ListType } from '../models/List';
import { TodoType } from '../models/Todo';

import ListModal from './ListModal';
import TodoModal from './TodoModal';

const Modal = () => {
  const { active, listId, todoId } = useAppSelector((state) => state.modal);

  if ((!todoId && !listId) || !listId) return null;

  const data = selectById(todoId || listId);

  if (!data) return null;

  const dispatch = useAppDispatch();

  function closeModalHandler() {
    dispatch(closeModal());
  }

  const TypedModal = () => {
    if ((data as TodoType).status !== undefined) {
      return <TodoModal listId={listId} todo={data as TodoType} />;
    } else return <ListModal list={data as ListType} />;
  };

  return (
    <div
      className={`${
        active ? 'visible' : 'invisible'
      } fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30`}
      onClick={closeModalHandler}
    >
      <div
        className="rounded-md bg-white p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <TypedModal />
      </div>
    </div>
  );
};

export default Modal;
