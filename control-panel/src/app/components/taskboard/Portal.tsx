import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

const Portal: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
};

export default Portal;
