import { create } from 'zustand';
import { Workflow } from '../types';

interface WorkflowStore {
  workflows: Workflow[];
  isLoading: boolean;
  setWorkflows: (workflows: Workflow[]) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  workflows: [],
  isLoading: false,
  setWorkflows: (workflows) => set({ workflows }),
  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [workflow, ...state.workflows] })),
  updateWorkflow: (updatedWorkflow) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === updatedWorkflow.id ? updatedWorkflow : w
      ),
    })),
  deleteWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
