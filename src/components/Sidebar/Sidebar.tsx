import { PlusIcon } from '../../assets/PlusIcon';

interface SidebarProps {
  onNewClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewClick }) => {
  return (
    <aside className="w-60 h-full border-r border-sidebar-border bg-white pt-0.5 flex flex-col">
      {/* Upper Div */}
      <div className="w-60 h-sidebar-header-h p-2 gap-2 flex flex-col items-center">
        {/* AirOps Title Div */}
        <div className="w-sidebar-header-w h-9 flex items-center gap-2 px-0">
          <div className="w-9 h-9 bg-sidebar-icon-bg rounded" />
          <span className="font-sans font-bold text-gray-900 text-lg">AirOps</span>
        </div>

        {/* New Button */}
        <button
          onClick={onNewClick}
          className="w-[224px] h-8 gap-1.5 pl-3 pr-2.5 py-1.5 rounded-md border border-border-subtle shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-13 leading-[20px] text-center font-sans">New</span>
          <PlusIcon className="w-3 h-3 text-text-primary" />
        </button>
      </div>

      {/* Remaining Sidebar Content Placeholder */}
      <div className="flex-1">
        {/* Navigation items will go here */}
      </div>
    </aside>
  );
};
