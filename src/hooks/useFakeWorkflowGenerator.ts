import { useState, useCallback } from 'react';
import AirOps from '@airops/airops-js';
import { Workflow } from '../types';
import { useWorkflowStore } from '../store/useWorkflowStore';

const WORKFLOW_ID = import.meta.env.VITE_AIROPS_WORKFLOW_ID;

type WorkflowStatus = 'idle' | 'loading' | 'success' | 'error';



interface UseFakeWorkflowGeneratorReturn {
  executeWorkflow: (inputs: Record<string, unknown>) => Promise<void>;
  status: WorkflowStatus;
  error: string | null;
  isLoading: boolean;
}

export function useFakeWorkflowGenerator(): UseFakeWorkflowGeneratorReturn {
  const [status, setStatus] = useState<WorkflowStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Get store actions
  const setWorkflows = useWorkflowStore(state => state.setWorkflows);
  const setLoading = useWorkflowStore(state => state.setLoading);

  const executeWorkflow = useCallback(async (inputs: Record<string, unknown>) => {
    setStatus('loading');
    setLoading(true);
    setError(null);

    try {
      // Initialize AirOps SDK
      // Note: For public apps client-side, we interpret the docs as needing no auth or specific public identifying.
      const airopsInstance = new AirOps();

      const response = await airopsInstance.apps.execute({
        appId: WORKFLOW_ID,
        tags: [
          { label: 'Test' },
          { label: 'Content Creation' }
        ],
        payload: {
          inputs: inputs,
        },
      });

      const result = await response.result();
      
      // Assuming the workflow returns the list of workflows directly in the output
      let parsedData: Workflow[] = [];
      try {
          if (typeof result.output === 'string') {
             parsedData = JSON.parse(result.output);
          } else {
             // If SDK returns parsed JSON already
             parsedData = result.output as unknown as Workflow[];
          }
      } catch (e) {
          console.warn('Failed to parse output', e); 
      }

      // Update Store
      setWorkflows(parsedData);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [setWorkflows, setLoading]);

  return {
    executeWorkflow,
    status,
    error,
    isLoading: status === 'loading',
  };
}
