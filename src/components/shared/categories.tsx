'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { useCategoryStore } from '../../../store/category';
import { Category } from '@prisma/client';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-[hsl(var(--muted))] p-1 rounded-2xl", className)} >
      {items.map(({ name, id }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-[hsl(var(--primary-foreground))] shadow-md shadow-gray-500 text-primary"
          )}
          href={`#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};

export default Categories;