import { Sidebar } from './Sidebar';

export const SidebarContainer = ({ onNewClick }: { onNewClick: () => void }) => {
  return <Sidebar onNewClick={onNewClick} />;
};
