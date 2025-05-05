'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { useCategoryStore } from '../../../store/category';
import { Category } from '@prisma/client';

interface Props {
  items: Category[];
  className?: string;
}

const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("flex overflow-x-auto whitespace-nowrap scrollbar-hide py-1 bg-[hsl(var(--muted))] p-1 rounded-2xl max-w-full", className)}
    >
      <div className="inline-flex gap-1 min-w-min">
        {items.map(({ name, id }, index) => (
          <a
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5 flex-shrink-0",
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
    </div>
  );
};

export default Categories;