import { useState, useCallback, useEffect } from 'react';
import { WorkflowForm } from './WorkflowForm';
import { Workflow, TagData } from '../../types';
import { AVAILABLE_ICONS } from '../../constants/formOptions';

interface WorkflowFormContainerProps {
    initialData?: Workflow | null;
    onSave: (data: Partial<Workflow>) => void;
    onCancel: () => void;
}

export const WorkflowFormContainer: React.FC<WorkflowFormContainerProps> = ({
    initialData,
    onSave,
    onCancel
}) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Workflow');
    const [icon, setIcon] = useState(AVAILABLE_ICONS[0]);
    const [tags, setTags] = useState<TagData[]>([]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setType(initialData.type);
            setIcon(initialData.icon || AVAILABLE_ICONS[0]);
            setTags(initialData.tags || []);
        } else {
            setName('');
            setType('Workflow');
            setIcon(AVAILABLE_ICONS[0]);
            setTags([]);
        }
    }, [initialData]);

    const handleTagsChange = useCallback((newTags: TagData[]) => {
        setTags(newTags);
    }, []);

    const handleSave = useCallback(() => {
        onSave({ name, type, icon, tags });
    }, [name, type, icon, tags, onSave]);

    return (
        <WorkflowForm
            name={name}
            type={type}
            icon={icon}
            selectedTags={tags}
            onNameChange={setName}
            onTypeChange={setType}
            onIconChange={setIcon}
            onTagsChange={handleTagsChange}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};
