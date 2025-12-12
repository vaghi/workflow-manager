import React, { useState, useRef, useEffect } from 'react';
import { TagData } from '../../types';
import { AVAILABLE_TAGS, TAG_COLORS } from '../../constants/formOptions';
import { PlusIcon } from '../../assets/PlusIcon';

interface TagSelectorProps {
    selectedTags?: TagData[];
    onChange: (tags: TagData[]) => void;
    readOnly?: boolean;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTag = (tagToToggle: TagData) => {
        const exists = selectedTags.some(t => t.label === tagToToggle.label);
        if (exists) {
            onChange(selectedTags.filter(t => t.label !== tagToToggle.label));
        } else {
            onChange([...selectedTags, tagToToggle]);
        }
    };

    const isEmpty = selectedTags.length === 0;

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="" // Container needs no special class, the children carry them
            >
                {isEmpty ? (
                    <div className="flex w-fit items-center h-[30px] gap-2 px-2.5 py-1.5 rounded-[38px] border border-border-subtle cursor-pointer hover:bg-gray-50 transition-colors">
                        <PlusIcon className="w-3 h-3 text-text-tertiary" />
                        <span className="font-sans font-semibold text-13 leading-[20px] text-text-tertiary">
                            Add Tag
                        </span>
                    </div>
                ) : (
                    <div className="flex w-fit items-center h-[30px] gap-2 px-2.5 py-1.5 rounded-[38px] border border-border-subtle cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex h-2 gap-1">
                            {selectedTags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="w-2 h-2 rounded-[2px]"
                                    style={{ backgroundColor: TAG_COLORS[tag.label], border: `1px solid ${TAG_COLORS[tag.label]}` }}
                                />
                            ))}
                        </div>
                        <span className="font-sans font-semibold text-13 leading-[20px] text-text-primary">
                            {selectedTags.length > 1 ? `${selectedTags.length} tags` : selectedTags[0].label}
                        </span>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {AVAILABLE_TAGS.map(tag => {
                        const isSelected = selectedTags.some(t => t.label === tag.label);
                        return (
                            <div
                                key={tag.label}
                                onClick={() => toggleTag(tag)}
                                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TAG_COLORS[tag.label] }} />
                                    <span className="text-sm text-gray-700">{tag.label}</span>
                                </div>
                                {isSelected && (
                                    <span className="text-primary text-sm font-bold">✓</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
