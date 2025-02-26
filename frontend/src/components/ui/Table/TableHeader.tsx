import { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BasicInput } from '../BasicInput';
import { cn } from '../../../lib/utils';

/**
 * TableHeader component that displays a title, search input, and action buttons.
 */

export interface TableHeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
  className?: string;
}

export function TableHeader({
  title,
  showSearch = false,
  onSearch,
  searchPlaceholder = 'Search...',
  actions,
  className,
}: TableHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4", className)}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      )}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 ml-auto">
        {showSearch && onSearch && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <BasicInput
              name="search"
              placeholder={searchPlaceholder}
              onChange={onSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
} 