'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { useCategoryStore } from '../../../store/category';

interface Props {
  items: Category[];
  className?: string;
}

// const cats = [
//   { id: 1, name: 'Піци' },
//   { id: 2, name: 'Комбо' },
//   { id: 3, name: 'Закуски' },
//   { id: 4, name: 'Кокотейлі' },
//   { id: 5, name: 'Кава' },
//   { id: 6, name: 'Десерти' },
//   { id: 7, name: 'Напої' },
// ];

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {
            items.map(({ name, id }, index) => (
                <a className={cn(
                    'flex items-center font-bold h-11 rounded-2xl px-5' , 
                    categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                )} 
                href={`#${name}`}
                key={index}>
                    <button>{name}</button>
                </a>
            ))
        }
    </div>
  );
};

export default Categories;