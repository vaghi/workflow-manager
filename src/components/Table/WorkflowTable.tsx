import React from 'react';
import { Workflow } from '../../types';
import { TagSelector } from '../TagSelector/TagSelector';
import { EditIcon } from '../../assets/EditIcon';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { SpreadsheetIcon } from '../../assets/SpreadsheetIcon';

interface WorkflowTableProps {
  data: Workflow[];
  onEditClick: (workflow: Workflow) => void;
  onDeleteClick: (workflow: Workflow) => void;
  onUpdateWorkflow: (workflow: Workflow) => void;
  isLoading?: boolean;
}

import { formatTimeAgo } from '../../utils/dateUtils';

interface WorkflowTableProps {
  data: Workflow[];
  onEditClick: (workflow: Workflow) => void;
  onDeleteClick: (workflow: Workflow) => void;
  onUpdateWorkflow: (workflow: Workflow) => void;
  isLoading?: boolean;
}

export const WorkflowTable: React.FC<WorkflowTableProps> = React.memo(({ data, onEditClick, onDeleteClick, onUpdateWorkflow, isLoading }) => {
  const isEmpty = data.length === 0;

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        {/* Header */}
        <div className="flex h-14 border-b border-border-subtle px-4 items-center">
          <div className="w-[120px] font-sans font-semibold text-[14px] leading-[20px] text-text-primary shrink-0">Type</div>
          <div className="flex-1 font-sans font-semibold text-[14px] leading-[20px] text-text-primary min-w-[200px]">Name</div>
          <div className="w-[300px] font-sans font-semibold text-[14px] leading-[20px] text-text-primary shrink-0">Tags</div>
          <div className="w-[140px] font-sans font-semibold text-[14px] leading-[20px] text-text-primary shrink-0">Last Updated</div>
          <div className="w-[88px] font-sans font-semibold text-[14px] leading-[20px] text-text-primary shrink-0">Actions</div>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="h-[200px] flex items-center justify-center font-sans text-gray-400">
            No workflows to show
          </div>
        ) : (
          data.map((workflow) => (
            <div key={workflow.id} className="flex h-14 border-b border-border-subtle px-4 items-center hover:bg-gray-50 transition-colors">
              {/* Type */}
              <div className="w-[120px] font-sans font-normal text-13 leading-[20px] text-text-secondary shrink-0">
                {workflow.type}
              </div>

              {/* Name (With icon) */}
              <div className="flex-1 font-sans font-medium text-[14px] leading-[20px] text-text-primary flex items-center gap-3 min-w-[200px] truncate pr-4">
                {workflow.icon === 'spreadsheet' && <SpreadsheetIcon />}
                {workflow.icon === 'document' && <span>📄</span>}
                {workflow.icon === 'apple' && <span>🍎</span>}
                {workflow.icon === 'bulb' && <span>💡</span>}
                {workflow.icon === 'pencil' && <span>✏️</span>}
                <span className="truncate">{workflow.name}</span>
              </div>

              {/* Tags */}
              <div className="w-[300px] flex items-center pr-[24px] shrink-0">
                <TagSelector
                  selectedTags={workflow.tags}
                  onChange={(newTags) => onUpdateWorkflow({ ...workflow, tags: newTags })}
                />
              </div>

              {/* Last Updated */}
              <div className="w-[140px] font-sans font-normal text-13 leading-[20px] text-text-tertiary shrink-0">
                {formatTimeAgo(workflow.lastUpdated)}
              </div>
              {/* Actions */}
              <div className="w-[88px] h-[64px] flex items-center gap-2 py-4 shrink-0">
                {/* Edit Button */}
                <button
                  onClick={() => onEditClick(workflow)}
                  className="w-6 h-6 p-1.5 rounded-md bg-bg-subtle flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <EditIcon className="w-13 h-13" />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => onDeleteClick(workflow)}
                  className="w-6 h-6 p-1.5 rounded-md bg-bg-subtle flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <DeleteIcon className="w-13 h-13" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});
