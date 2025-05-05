/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { Api } from '../../../services/api-client';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
  defaultExpanded?: boolean;
}

export const SearchInput: React.FC<Props> = ({ className, defaultExpanded = false }) => {
    const [searchQuery, setSearchQuery] = React.useState('');  
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const ref = React.useRef(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useClickAway(ref, () => {
        setFocused(false);  
        // На мобильных при клике вне элемента сворачиваем поиск до иконки, только если не установлен defaultExpanded
        if (window.innerWidth < 768 && !defaultExpanded) {
            setExpanded(false);
        }
    });
    
    // Загружаем товары при фокусе, если поиск пустой
    React.useEffect(() => {
        if (focused && searchQuery.trim().length === 0) {
            const loadDefaultProducts = async () => {
                try {
                    // Используем существующий метод search с пустой строкой, чтобы получить список товаров
                    const response = await Api.products.search("");
                    setProducts(response.slice(0, 5)); // Показываем только 5 товаров
                } catch (error) {
                    console.log(error);
                }
            };
            loadDefaultProducts();
        }
    }, [focused, searchQuery]);
    
    useDebounce(
        async () => {
        if (searchQuery.trim().length > 0) {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response);
            } catch (error) {
                console.log(error);
            }
        } else if (!focused) {
            setProducts([]);
        }
    }, 
    250,
    [searchQuery]);

    const OnclickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
        if (window.innerWidth < 768 && !defaultExpanded) {
            setExpanded(false);
        }
    }

    const handleSearchIconClick = () => {
        setExpanded(true);
        // Устанавливаем фокус на инпут после его появления
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }

    const handleClearSearch = () => {
        setSearchQuery('');
        inputRef.current?.focus();
    }

  return (
    <>
        {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>}
        
        {/* Иконка поиска для мобильных устройств (показывается, когда поиск не раскрыт и не установлен defaultExpanded) */}
        {!expanded && !defaultExpanded && (
            <button 
                type="button"
                className="md:hidden flex items-center justify-center rounded-full bg-gray-100 h-11 w-11 cursor-pointer" 
                onClick={handleSearchIconClick}
                aria-label="Открыть поиск"
            >
                <Search className="h-5 w-5 text-gray-400" />
            </button>
        )}

        {/* Полная строка поиска (всегда видна на десктопе, на мобильных - при expanded=true или defaultExpanded=true) */}
        <div 
            ref={ref}
            className={cn(
                "flex rounded-2xl flex-1 justify-between relative h-11 z-30", 
                (expanded || defaultExpanded) ? "w-full" : "hidden md:flex",
                className
            )}>
            <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
            <input
                ref={inputRef}
                className="rounded-2xl outline-none w-full text-black bg-gray-100 pl-11 pr-10"
                type="text"
                placeholder="Знайти пицу..."
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Кнопки для очистки поиска и закрытия строки поиска */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                {searchQuery && (
                    <button 
                        type="button"
                        className="flex items-center justify-center rounded-full bg-gray-200 h-6 w-6"
                        onClick={handleClearSearch}
                        aria-label="Очистить поиск"
                    >
                        <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                )}
                
                {/* Кнопка закрытия, не показывается если установлен defaultExpanded */}
                {expanded && !defaultExpanded && (
                    <button 
                        type="button"
                        className="md:hidden flex items-center justify-center rounded-full bg-gray-200 h-6 w-6 ml-1"
                        onClick={() => setExpanded(false)}
                        aria-label="Закрыть поиск"
                    >
                        <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                )}
            </div>

            {products.length > 0 && <div className={cn(
                'absolute w-full bg-[hsl(var(--muted))] rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                focused && 'visible opacity-100 top-12'
                )}>
                {products.map((product) => (
                    <Link 
                        onClick={OnclickItem}
                        key={product.id}
                        className="flex rounded-[10px] items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                        href={`/product/${product.id}`}>
                        <img className='rounded-sm h-8 w-8' src={product.imageUrl} alt={product.name}/>
                        <span>{product.name}</span>
                    </Link>
                ))}
            </div>}
        </div>
    </>
  );
};
