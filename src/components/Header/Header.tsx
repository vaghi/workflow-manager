import React from 'react';
import { MagnifierIcon } from '../../assets/MagnifierIcon';

interface HeaderProps {
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, onSortChange }) => {
  return (
    <header className="h-20 w-full px-5 border-b-[0.5px] border-stroke-primary flex items-center justify-between bg-white">
      <h1 className="font-bold text-30 leading-[36px] tracking-[-0.02em] font-sans">
        Workflows
      </h1>

      <div className="flex gap-2 h-8 items-center">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            className="w-[65px] h-8 pl-[12px] pr-[12px] rounded-md border-[0.5px] border-stroke-primary bg-white font-semibold text-13 leading-[20px] tracking-normal appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-200"
            defaultValue="Sort"
            onChange={onSortChange}
            aria-label="Sort workflows"
          >
            <option value="" disabled hidden>Sort</option>
            <option value="type">Type</option>
            <option value="name">Name</option>
            <option value="lastUpdated">Last Updated</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="w-search h-8 gap-2 px-[12px] py-[6px] rounded-md border border-[#00000029] shadow-[0px_1px_3px_0px_#1018281A] flex items-center bg-white">
          <MagnifierIcon className="w-13 h-13" />
          <input
            type="text"
            placeholder="Search workflows"
            className="w-full h-full border-none outline-none font-normal text-[14px] leading-[20px] placeholder:text-text-secondary bg-transparent"
            onChange={onSearchChange}
          />
        </div>
      </div>
    </header>
  );
};
