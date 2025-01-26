export const categories = [
    {
        name: 'Піци',
    },
    {
        name: 'Сніданок',
    },
    {
        name: 'Закуски',
    },
    {
        name: 'Кокотейлі',
    },
    {
        name: 'Кава',
    },
    {
        name: 'Десерти',
    },
    {
        name: 'Напої',
    },
]

export const ingredients = [
    {
        name: 'Сирний бортик',
        price: 90,
        imageUrl:'/img/ingredients/Сирний бортик.png',
      },
      {
        name: 'Сливочна моцарелла',
        price: 40,
        imageUrl:'/img/ingredients/Сливочна моцарелла.png',
      },
      {
        name: 'Сир чеддер i пармезан',
        price: 40,
        imageUrl: '/img/ingredients/Сир чеддер i пармезан.png',
      },
      {
        name: 'Острий перець халапеньо',
        price: 30,
        imageUrl: '/img/ingredients/Острий перець халапеньо.png',
      },
      {
        name: 'Ніжне курча',
        price: 40,
        imageUrl: '/img/ingredients/Ніжне курча.png',
      },
      {
        name: 'Шампiньйони',
        price: 30,
        imageUrl: '/img/ingredients/Шампiньйони.png',
      },
      {
        name: 'Шинка',
        price: 40,
        imageUrl: '/img/ingredients/Шинка.png',
      },
      {
        name: 'Пiкантне пеперонi',
        price: 40,
        imageUrl: '/img/ingredients/Пiкантне пеперонi.png',
      },
      {
        name: 'Гостра чорізо',
        price: 40,
        imageUrl: '/img/ingredients/Гостра чорізо.png',
      },
      {
        name: 'Мариновані огурчики',
        price: 30,
        imageUrl: '/img/ingredients/Мариновані огурчики.png',
      },
      {
        name: 'Свiжi помiдори',
        price: 30,
        imageUrl: '/img/ingredients/Свiжi помiдори.png',
      },
      {
        name: 'Червоний лук',
        price: 30,
        imageUrl: '/img/ingredients/Червоний лук.png',
      },
      {
        name: 'Сік ананасу',
        price: 30,
        imageUrl: '/img/ingredients/Сік ананасу.png',
      },
      {
        name: 'Італiйскi трави',
        price: 20,
        imageUrl: '/img/ingredients/Італiйскi трави.png',
      },
      {
        name: 'Солодкий перець',
        price: 30,
        imageUrl: '/img/ingredients/Солодкий перець.png',},
      {
        name: 'Кубики бринзи',
        price: 40,
        imageUrl: '/img/ingredients/Кубики бринзи.png',
      },
      {
        name: 'М\'ясні шарики',
        price: 40,
        imageUrl: '/img/ingredients/М\'ясні шарики.png',
      },
].map((obj, index) => ({id: index + 1, ...obj}));

export const products = [
    {
        name: 'Омлет з ветчиною i грибами',
        imageUrl:
          '/img/products/Омлет з ветчиною i грибами.webp',
        categoryId: 2,
      },
      {
        name: 'Омлет з пепероні',
        imageUrl:
          '/img/products/Омлет з пепероні.webp',
        categoryId: 2,
      },
      {
        name: 'Кавовий латте',
        imageUrl:
          '/img/products/Кавовий латте.webp',
        categoryId: 2,
      },
      {
        name: 'Сендвіч з шинкою і сиром',
        imageUrl:
          '/img/products/Сендвіч з шинкою і сиром.webp',
        categoryId: 3,
      },
      {
        name: 'Курячі наггетси',
        imageUrl:
          '/img/products/Курячі наггетси.webp',
        categoryId: 3,
      },
      {
        name: 'Картопля з печi з соусом',
        imageUrl:
          '/img/products/Картопля з печi з соусом.webp',
        categoryId: 3,
      },
      {
        name: 'Додстер',
        imageUrl:
          '/img/products/Додстер.webp',
        categoryId: 3,
      },
      {
        name: 'Гострий Додстер',
        imageUrl:
          '/img/products/Гострий Додстер.webp',
        categoryId: 3,
      },
      {
        name: 'Банановий молочний коктейль',
        imageUrl:
          '/img/products/Банановий молочний коктейль.png',
        categoryId: 4,
      },
      {
        name: 'Карамельне яблуко молочний коктейль',
        imageUrl:
          '/img/products/Карамельне яблуко молочний коктейль.png',
        categoryId: 4,
      },
      {
        name: 'Молочний коктейль з печiвом Орео',
        imageUrl:
          '/img/products/Молочний коктейль з печiвом Орео.jpg',
        categoryId: 4,
      },
      {
        name: 'Класичний молочний коктейль',
        imageUrl:
          '/img/products/Класичний молочний коктейль.jpg',
        categoryId: 4,
      },
      {
        name: 'Ирландський Капучино',
        imageUrl:
          '/img/products/Ирландський Капучино.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Карамельний капучино',
        imageUrl:
          '/img/products/Кавовий Карамельний капучино.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Кокосовий латте',
        imageUrl:
          '/img/products/Кавовий Кокосовий латте.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Американо',
        imageUrl:
          '/img/products/Кавовий Американо.webp',
        categoryId: 5,
      },  
]