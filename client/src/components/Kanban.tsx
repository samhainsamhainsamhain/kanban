import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchLists } from '../app/slices/lists/lists.thunk';

import List from './List';
import ListForm from './ListForm';

type KanbanProps = {};

const Kanban: FC<KanbanProps> = ({}: KanbanProps) => {
  const { lists } = useAppSelector((state) => state.lists);
  const { isLoading } = useAppSelector((state) => state.lists);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  return (
    <div className="flex flex-row px-2">
      <div className="flex flex-shrink-0 flex-row overflow-x-auto px-2">
        {!isLoading &&
          lists.length > 0 &&
          lists.map((list) => <List list={list} key={Math.random()} />)}
      </div>
      <ListForm />
    </div>
  );
};

export default Kanban;
