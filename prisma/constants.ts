export const categories = [
    {
        name: 'Піци',
    },
    {
        name: 'Комбо',
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
        imageUrl:'public/img/ingredients/Сирний бортик.png',
      },
      {
        name: 'Сливочна моцарелла',
        price: 40,
        imageUrl:'public/img/ingredients/Сливочна моцарелла.png',
      },
      {
        name: 'Сир чеддер i пармезан',
        price: 40,
        imageUrl: 'public/img/ingredients/Сир чеддер i пармезан.png',
      },
      {
        name: 'Острий перець халапеньо',
        price: 30,
        imageUrl: 'public/img/ingredients/Острий перець халапеньо.png',
      },
      {
        name: 'Ніжне курча',
        price: 40,
        imageUrl: 'public/img/ingredients/Ніжне курча.png',
      },
      {
        name: 'Шампiньйони',
        price: 30,
        imageUrl: 'public/img/ingredients/Шампiньйони.png',
      },
      {
        name: 'Шинка',
        price: 40,
        imageUrl: 'public/img/ingredients/Шинка.png',
      },
      {
        name: 'Пiкантне пеперонi',
        price: 40,
        imageUrl: 'public/img/ingredients/Пiкантне пеперонi.png',
      },
      {
        name: 'Гостра чорізо',
        price: 40,
        imageUrl: 'public/img/ingredients/Гостра чорізо.png',
      },
      {
        name: 'Мариновані огурчики',
        price: 30,
        imageUrl: 'public/img/ingredients/Мариновані огурчики.png',
      },
      {
        name: 'Свiжi помiдори',
        price: 30,
        imageUrl: 'public/img/ingredients/Свiжi помiдори.png',
      },
      {
        name: 'Червоний лук',
        price: 30,
        imageUrl: 'public/img/ingredients/Червоний лук.png',
      },
      {
        name: 'Сік ананасу',
        price: 30,
        imageUrl: 'public/img/ingredients/Сік ананасу.png',
      },
      {
        name: 'Італiйскi трави',
        price: 20,
        imageUrl: 'public/img/ingredients/Італiйскi трави.png',
      },
      {
        name: 'Солодкий перець',
        price: 30,
        imageUrl: 'public/img/ingredients/Солодкий перець.png',},
      {
        name: 'Кубики бринзи',
        price: 40,
        imageUrl: 'public/img/ingredients/Кубики бринзи.png',
      },
      {
        name: 'М\'ясні шарики',
        price: 40,
        imageUrl: 'public/img/ingredients/М\'ясні шарики.png',
      },
].map((obj, index) => ({id: index + 1, ...obj}));

export const products = [
    {
        name: 'Омлет з ветчиною i грибами',
        imageUrl:
          'public/img/products/Омлет з ветчиною i грибами.webp',
        categoryId: 2,
      },
      {
        name: 'Омлет з пепероні',
        imageUrl:
          'public/img/products/Омлет з пепероні.webp',
        categoryId: 2,
      },
      {
        name: 'Кавовий латте',
        imageUrl:
          'public/img/products/Кавовий латте.webp',
        categoryId: 2,
      },
      {
        name: 'Сендвіч з шинкою і сиром',
        imageUrl:
          'public/img/products/Сендвіч з шинкою і сиром.webp',
        categoryId: 3,
      },
      {
        name: 'Курячі наггетси',
        imageUrl:
          'public/img/products/Курячі наггетси.webp',
        categoryId: 3,
      },
      {
        name: 'Картопля з печi з соусом',
        imageUrl:
          'public/img/products/Картопля з печi з соусом.webp',
        categoryId: 3,
      },
      {
        name: 'Додстер',
        imageUrl:
          'public/img/products/Додстер.webp',
        categoryId: 3,
      },
      {
        name: 'Гострий Додстер',
        imageUrl:
          'public/img/products/Гострий Додстер.webp',
        categoryId: 3,
      },
      {
        name: 'Банановий молочний коктейль',
        imageUrl:
          'public/img/products/Банановий молочний коктейль.jpg',
        categoryId: 4,
      },
      {
        name: 'Карамельне яблуко молочний коктейль',
        imageUrl:
          'public/img/products/Карамельне яблуко молочний коктейль.jpg',
        categoryId: 4,
      },
      {
        name: 'Молочний коктейль з печiвом Орео',
        imageUrl:
          'public/img/products/Молочний коктейль з печiвом Орео.jpg',
        categoryId: 4,
      },
      {
        name: 'Класичний молочний коктейль',
        imageUrl:
          'public/img/products/Класичний молочний коктейль.jpg',
        categoryId: 4,
      },
      {
        name: 'Ирландський Капучино',
        imageUrl:
          'public/img/products/Ирландський Капучино.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Карамельний капучино',
        imageUrl:
          'public/img/products/Кавовий Карамельний капучино.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Кокосовий латте',
        imageUrl:
          'public/img/products/Кавовий Кокосовий латте.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Американо',
        imageUrl:
          'public/img/products/Кавовий Американо.webp',
        categoryId: 5,
      },
      {
        name: 'Кавовий Латте',
        imageUrl:
          'public/img/products/Кавовий Латте.webp',
        categoryId: 5,
      },
]