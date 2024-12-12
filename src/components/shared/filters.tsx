import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
        <Title text="Фільтрування" size='sm' className="mb-5 font-bold" />

        <div className="flex flex-col gap-4">
            <FilterCheckbox text="Можна збирати" value="1" />
            <FilterCheckbox text="Новинки" value="2" />
        </div>

        
    </div>
  );
};