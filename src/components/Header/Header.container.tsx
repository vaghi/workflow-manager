import React, { useState, useEffect } from 'react';
import { Header as HeaderPresentation } from './Header';
import { useDebounce } from '../../hooks/useDebounce';

interface HeaderContainerProps {
  onSortChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearch?: (searchTerm: string) => void;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({ onSortChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <HeaderPresentation
      onSearchChange={handleSearchChange}
      onSortChange={onSortChange}
    />
  );
};
