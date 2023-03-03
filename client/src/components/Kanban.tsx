import { FC } from 'react';

import { useAppSelector } from '../app/hooks';

import List from './List';
import ListForm from './ListForm';

type KanbanProps = {};

const Kanban: FC<KanbanProps> = ({}: KanbanProps) => {
  const lists = useAppSelector((state) => state.lists);

  return (
    <div className="flex flex-row px-2">
      <div className="flex flex-shrink-0 flex-row overflow-x-auto px-2">
        {lists.length > 0 &&
          lists.map((list) => <List list={list} key={Math.random()} />)}
      </div>
      <ListForm />
    </div>
  );
};

export default Kanban;
