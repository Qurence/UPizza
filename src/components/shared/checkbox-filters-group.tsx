'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selected?: Set<string>;
    name?: string
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Пошук',
    loading,
    onClickCheckbox,
    defaultValue,
    selected,
    name,
    className,
    }) => {
    const [showAll, SetShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    
    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    if (loading) {
        return <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {...Array(limit).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
            ))}

            <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
        </div>
    }
    
    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) 
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {showAll &&(
            <div className="mb-5">
            <Input 
                onChange={onChangeSearchInput} 
                placeholder={searchInputPlaceholder} 
                className=""/>
            </div>
        )}

        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, index) => (
                <FilterCheckbox 
                key={index}
                text={item.text}
                value={item.value}
                endAdornment={item.endAdornment}
                checked={selected?.has(item.value)}
                onCheckedChange={() => onClickCheckbox?.(item.value)}
                name={name}
                />
            ))}
        </div>

        {items.length > limit && (
            <div className={showAll ? 'border-t-neutral-100 mt-4' : ''}>
                <button onClick={() => SetShowAll(!showAll)} className="text-primary mt-3"> 
                    {showAll ? 'Приховати' : '+ Показати все'}
                </button>
            </div>
        )}
    </div>
  );
};

