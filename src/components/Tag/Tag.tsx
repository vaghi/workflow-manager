import React from 'react';
import { PlusIcon } from '../../assets/PlusIcon';
import { TagData } from '../../types';
import { TAG_COLORS } from '../../constants/formOptions';

interface TagProps {
  tags?: TagData[];
  isEmpty?: boolean;
}

export const Tag: React.FC<TagProps> = ({ tags, isEmpty }) => {
  if (isEmpty || !tags || tags.length === 0) {
    return (
      <div className="flex w-fit items-center h-[30px] gap-[8px] px-[10px] py-[5px] rounded-[38px] border border-[#09090B14] cursor-pointer hover:bg-gray-50 transition-colors">
        <PlusIcon className="w-[12px] h-[12px] text-[#808593]" />
        <span className="font-sans font-semibold text-[13px] leading-[20px] text-[#808593]">
          Add Tag
        </span>
      </div>
    );
  }

  const isMultiple = tags.length > 1;
  const label = isMultiple ? `${tags.length} tags` : tags[0].label;
  // If multiple, show all dots. If single, show single dot.
  const colors = tags.map(t => t.color || TAG_COLORS[t.label]);

  return (
    <div className="flex w-fit items-center h-[30px] gap-[8px] px-[10px] py-[5px] rounded-[38px] border border-[#09090B14]">
      <div className="flex h-[8px] gap-[4px]">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-[8px] h-[8px] rounded-[2px]"
            style={{ backgroundColor: color || '#ccc', border: `1px solid ${color || '#ccc'}` }}
          />
        ))}
      </div>
      <span className="font-sans font-semibold text-[13px] leading-[20px] text-gray-900">
        {label}
      </span>
    </div>
  );
};
