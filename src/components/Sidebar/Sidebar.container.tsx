import React from 'react';
import { Sidebar } from './Sidebar';

interface SidebarContainerProps {
  onNewClick: () => void;
}

export const SidebarContainer = ({ onNewClick }: { onNewClick: () => void }) => {
  return <Sidebar onNewClick={onNewClick} />;
};
