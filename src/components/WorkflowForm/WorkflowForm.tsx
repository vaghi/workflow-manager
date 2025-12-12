import React from 'react';
import { AVAILABLE_ICONS } from '../../constants/formOptions';
import { TagData } from '../../types';
import { TagSelector } from '../TagSelector/TagSelector';
import { SpreadsheetIcon } from '../../assets/SpreadsheetIcon';

interface WorkflowFormProps {
    name: string;
    type: string;
    icon: string;
    selectedTags: TagData[];
    onNameChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onIconChange: (value: string) => void;
    onTagsChange: (tags: TagData[]) => void;
    onSave: () => void;
    onCancel: () => void;
    isSaving?: boolean;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({
    name,
    type,
    icon,
    selectedTags,
    onNameChange,
    onTypeChange,
    onIconChange,
    onTagsChange,
    onSave,
    onCancel,
    isSaving
}) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Name Input */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="e.g. Text Generator"
                    className="px-3 py-2 border border-stroke-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                />
            </div>

            {/* Type Select */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value)}
                    className="px-3 py-2 border border-stroke-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                    <option value="Workflow">Workflow</option>
                    <option value="Agent">Agent</option>
                </select>
            </div>

            {/* Icon Selector */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Icon</label>
                <div className="flex gap-3">
                    {AVAILABLE_ICONS.map((iconName) => (
                        <button
                            key={iconName}
                            onClick={() => onIconChange(iconName)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all ${icon === iconName
                                ? 'border-primary bg-primary-light ring-1 ring-primary'
                                : 'border-stroke-primary bg-white hover:bg-gray-50'
                                }`}
                            aria-label={`Select ${iconName} icon`}
                        >
                            {iconName === 'spreadsheet' && <SpreadsheetIcon className="w-5 h-5" />}
                            {iconName === 'document' && <span className="text-xl">📄</span>}
                            {iconName === 'apple' && <span className="text-xl">🍎</span>}
                            {iconName === 'bulb' && <span className="text-xl">💡</span>}
                            {iconName === 'pencil' && <span className="text-xl">✏️</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tags Checkboxes */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Tags</label>
                <TagSelector
                    selectedTags={selectedTags}
                    onChange={(newTags) => {
                        onTagsChange(newTags);
                    }}
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    onClick={onCancel}
                    className="px-3 py-2 border border-stroke-primary text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 font-medium text-13"
                >
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={!name.trim() || isSaving}
                    className="px-4 py-2 text-13 font-medium text-white bg-text-primary rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};
