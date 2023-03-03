import { useAppSelector } from './app/hooks';

import Kanban from './components/Kanban';
import Modal from './components/Modal';

import './style.css';

function App() {
  const { active } = useAppSelector((state) => state.modal);
  return (
    <div>
      <Kanban />
      {active && <Modal />}
    </div>
  );
}

export default App;
