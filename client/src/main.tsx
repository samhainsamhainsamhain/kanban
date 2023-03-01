import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
