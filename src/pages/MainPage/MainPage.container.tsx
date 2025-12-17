import React, { useState, useMemo, useCallback } from 'react';
import { MainPage as MainPagePresentation } from './MainPage';
import { useFakeWorkflowGenerator } from '../../hooks/useFakeWorkflowGenerator';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Workflow } from '../../types';

type SortOption = 'type' | 'name' | 'lastUpdated' | '';

export const MainPageContainer = () => {
  const { executeWorkflow } = useFakeWorkflowGenerator();
  // Use Zustand store
  const workflows = useWorkflowStore(state => state.workflows);
  const isLoading = useWorkflowStore(state => state.isLoading);
  const addWorkflow = useWorkflowStore(state => state.addWorkflow);
  const updateWorkflow = useWorkflowStore(state => state.updateWorkflow);
  const deleteWorkflow = useWorkflowStore(state => state.deleteWorkflow);

  const [sortBy, setSortBy] = useState<SortOption>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

  // Delete Modal State
  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);

  // Fetch data on mount
  React.useEffect(() => {
    if (workflows.length === 0) {
      executeWorkflow({});
    }
  }, [executeWorkflow, workflows.length]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchQuery(term);
  }, []);

  // Modal Handlers
  const handleNewClick = useCallback(() => {
    setEditingWorkflow(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((workflow: Workflow) => {
    setEditingWorkflow(workflow);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalExited = useCallback(() => {
    setEditingWorkflow(null);
  }, []);

  const handleSave = useCallback((data: Partial<Workflow>) => {
    if (editingWorkflow) {
      // Update
      updateWorkflow({ ...editingWorkflow, ...data, lastUpdated: new Date().toISOString() } as Workflow);
    } else {
      // Create
      const newWorkflow: Workflow = {
        id: crypto.randomUUID(), // distinct ID for client-side
        type: data.type || 'Workflow',
        name: data.name || 'New Workflow',
        tags: [],
        lastUpdated: new Date().toISOString(),
        icon: 'document', // Default icon
        ...data
      } as Workflow;
      addWorkflow(newWorkflow);
    }
    handleCloseModal();
  }, [addWorkflow, updateWorkflow, editingWorkflow, handleCloseModal]);

  // Delete Handlers
  const handleDeleteClick = useCallback((workflow: Workflow) => {
    setWorkflowToDelete(workflow);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (workflowToDelete) {
      deleteWorkflow(workflowToDelete.id);
      setWorkflowToDelete(null);
    }
  }, [deleteWorkflow, workflowToDelete]);

  const handleCancelDelete = useCallback(() => {
    setWorkflowToDelete(null);
  }, []);


  const filteredAndSortedData = useMemo(() => {
    let result = [...workflows];

    // Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    if (sortBy) {
      result.sort((a: Workflow, b: Workflow) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'type') {
          return a.type.localeCompare(b.type);
        }
        if (sortBy === 'lastUpdated') {
          const getHours = (str: string) => {
            const lower = str.toLowerCase();
            const val = parseInt(lower, 10);
            if (lower.includes('day')) return val * 24;
            if (lower.includes('week')) return val * 24 * 7;
            if (lower.includes('month')) return val * 24 * 30;
            if (lower.includes('year')) return val * 24 * 365;
            return val;
          };
          return getHours(a.lastUpdated) - getHours(b.lastUpdated);
        }
        return 0;
      });
    }

    return result;
  }, [workflows, sortBy, searchQuery]);

  return (
    <MainPagePresentation
      data={filteredAndSortedData}
      onSortChange={handleSortChange}
      onSearch={handleSearch}
      onNewClick={handleNewClick}
      onEditClick={handleEditClick}
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      onModalExited={handleModalExited}
      onSave={handleSave}
      editingWorkflow={editingWorkflow}
      onDeleteClick={handleDeleteClick}
      workflowToDelete={workflowToDelete}
      onConfirmDelete={handleConfirmDelete}
      onCancelDelete={handleCancelDelete}
      onUpdateWorkflow={updateWorkflow}
      isLoading={isLoading}
    />
  );
};
