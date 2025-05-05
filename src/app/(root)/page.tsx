import { Container, Filters, ProductsGroupList, SortPopup, Title, TopBar, } from "@/components/shared";
import { Suspense } from "react";
import { findPizzas } from "@/lib";
import { GetSearchParams } from "@/lib/find-pizzas";
import { Filter, ListFilter } from "lucide-react";
import Categories from "@/components/shared/categories";

interface PageProps {
  searchParams: Promise<GetSearchParams>;
}

export default async function Home({ searchParams }: PageProps) {
  const categories = await findPizzas(searchParams);
  const filteredCategories = categories.filter((cat) => cat.products.length > 0);

  return (
    <>
      {/* TopBar на desktop, вынесен на верхний уровень */}
      <div className="hidden md:block sticky top-0 bg-[hsl(var(--background))] py-5 shadow-lg shadow-black/5 z-10">
        <TopBar categories={filteredCategories} />
      </div>
      
      <Container className="mt-10">
        <Title text="Усі піци" size="lg" className="font-extrabold" />
      </Container>

      {/* Мобильная версия категорий */}
      <div className="md:hidden">
        <Container className="mt-4">
          <div className="relative">
            <details className="group">
              <summary className="flex items-center justify-between p-3 font-medium cursor-pointer bg-muted rounded-2xl">
                <span className="flex items-center gap-2">
                  <ListFilter className="w-5 h-5" />
                  Категорії
                </span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="p-4 mt-2 bg-muted rounded-2xl">
                <Categories items={filteredCategories} />
              </div>
            </details>
          </div>
        </Container>
      </div>

      {/* Мобильная версия сортировки */}
      <div className="md:hidden">
        <Container className="mt-4">
          <SortPopup className="w-full" />
        </Container>
      </div>

      <Container className="mt-10 pb-14">
        <div className="flex flex-col md:flex-row gap-4 md:gap-[80px]">
          {/* Левая колонка: фильтры */}
          <div className="w-full md:w-[250px]">
            {/* Фильтрация - скрыта на мобильных, открывается по клику */}
            <div className="block md:hidden">
              <details className="group mb-4">
                <summary className="flex items-center justify-between p-3 font-medium cursor-pointer bg-[hsl(var(--muted))] rounded-2xl">
                  <span className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Фільтри
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 mt-2 bg-white dark:bg-[hsl(var(--muted))] border border-gray-200 dark:border-gray-700 rounded-2xl">
                  <Suspense>
                    <Filters />
                  </Suspense>
                </div>
              </details>
            </div>
            <div className="hidden md:block">
              <Suspense>
                <Filters />
              </Suspense>
            </div>
          </div>

          {/* Список товаров - адаптивная сетка */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                      listClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[30px] lg:gap-[50px]"
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
