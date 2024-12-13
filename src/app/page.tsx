import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function Home() {
  return <>
    
    <Container className="mt-10">
      <Title text="Усі піци" size="lg" className="font-extrabold"/>

    </Container>

    <TopBar />

    <Container className="mt-10 pb-14">
      <div className="flex gap-[80px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>

        {/* Список товаров */}
        <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
              title={"Піци"} 
              items={[
                {
                id:1,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:2,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:3,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:4,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:5,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:6,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:7,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
              ]} categoryId={1} />
              <ProductsGroupList 
              title={"Комбо"} 
              items={[
                {
                id:1,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:2,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:3,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:4,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:5,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:6,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
                {
                id:7,
                name:"4 м`яса",
                imageUrl:"https://www.iqpizza.com.ua/_next/image?url=https%3A%2F%2Fiq-pizza.eatery.club%2Fstorage%2Fiq-pizza%2Fproduct%2Ficon%2F41846%2Fconversions%2Ftext-optimized.jpg&w=640&q=75",
                price: 100,
                items:[{price: 100}],
                },
              ]} categoryId={2} />
            </div>
        </div>
      </div>
    </Container>
    </>
}
