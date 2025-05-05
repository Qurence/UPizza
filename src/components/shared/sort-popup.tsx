'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const [selected, setSelected] = React.useState('популярное');

  const items = [
    { text: 'Сначала популярное', value: 'популярное' },
    { text: 'Сначала недорогие', value: 'недорогие' },
    { text: 'Сначала дорогие', value: 'дорогие' },
    { text: 'С лучшей оценкой', value: 'лучшие' },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'inline-flex w-full items-center justify-between gap-1 bg-[hsl(var(--muted))] px-4 h-[52px] rounded-2xl cursor-pointer',
            className,
          )}>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <b>Сортировка:</b>
          </div>

          <b className="text-primary">{selected}</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ul className="space-y-1">
          {items.map((item) => (
            <li 
              key={item.value}
              className={cn(
                "hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md",
                selected === item.value && "bg-secondary text-primary font-medium"
              )}
              onClick={() => handleSelect(item.value)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
