import React from 'react';
import { WorkflowTable } from '../../components/Table/WorkflowTable';
import { Workflow } from '../../types';
import { SidebarContainer } from '../../components/Sidebar/Sidebar.container';
import { HeaderContainer } from '../../components/Header/Header.container';

import { Modal } from '../../components/Modal/Modal';
import { WorkflowFormContainer } from '../../components/WorkflowForm/WorkflowForm.container';

interface MainPageProps {
  data: Workflow[];
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (searchTerm: string) => void;

  // New Props
  onNewClick: () => void;
  onEditClick: (workflow: Workflow) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onSave: (data: Partial<Workflow>) => void;
  editingWorkflow: Workflow | null;

  onDeleteClick: (workflow: Workflow) => void;
  workflowToDelete: Workflow | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;

  onUpdateWorkflow: (workflow: Workflow) => void;
  isLoading: boolean;
}

export const MainPage: React.FC<MainPageProps> = React.memo(({
  data,
  onSortChange,
  onSearch,
  onNewClick,
  onEditClick,
  isModalOpen,
  onCloseModal,
  onSave,
  editingWorkflow,
  onDeleteClick,
  workflowToDelete,
  onConfirmDelete,
  onCancelDelete,
  onUpdateWorkflow,
  isLoading
}) => {
  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      <SidebarContainer onNewClick={onNewClick} />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <HeaderContainer onSortChange={onSortChange} onSearch={onSearch} />
        <main className="flex-1 pl-5 pr-5 overflow-auto bg-surface min-w-0">
          <div className="bg-white shadow-sm min-h-max w-full">
            <WorkflowTable
              data={data}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onUpdateWorkflow={onUpdateWorkflow}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      {/* Edit/Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}
      >
        <WorkflowFormContainer
          initialData={editingWorkflow}
          onSave={onSave}
          onCancel={onCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!workflowToDelete}
        onClose={onCancelDelete}
        title="Delete Workflow"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-text-primary">{workflowToDelete?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onCancelDelete}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});
