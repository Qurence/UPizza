# 🍕 UPizza - Онлайн-піцерія | Online Pizzeria

[![Демо сайту](https://img.shields.io/badge/demo-website-green)](https://u-pizza.vercel.app/)

[English version](#english) | [Українська версія](#ukrainian)

---

<a id="ukrainian"></a>
# 🇺🇦 Українська версія

Сучасний веб-додаток для замовлення піци, побудований з використанням передових технологій веб-розробки.

## 🌟 Основні можливості

- 🛒 Онлайн замовлення піци та інших страв
- 👤 Система аутентифікації з підтримкою:
  - Email/Password реєстрації
  - OAuth авторизації через Google та GitHub
- 🛍️ Кошик покупок зі збереженням стану
- 💳 Інтеграція з платіжною системою WayForPay
- 📱 Адаптивний дизайн для всіх пристроїв
- 🔍 Фільтрація та пошук продуктів
- 👥 Особистий кабінет користувача

## 🚀 Технології

### Frontend
- **Next.js 14** - React фреймворк з підтримкою Server Components
- **TypeScript** - Типізований JavaScript
- **Tailwind CSS** - Утилітарний CSS фреймворк
- **Shadcn/ui** - Компонентна бібліотека
- **React Hook Form** - Управління формами
- **Zod** - Валідація даних
- **React Hot Toast** - Сповіщення

### Backend
- **Next.js API Routes** - Серверна частина додатку
- **Prisma** - ORM для роботи з базою даних
- **PostgreSQL** - База даних
- **NextAuth.js** - Аутентифікація
- **WayForPay** - Платіжна система

### Інфраструктура
- **Vercel** - Хостинг та деплой
- **GitHub** - Система контролю версій

## 🚨 Важлива примітка

У поточній версії деякі функції вимкнені для можливості безкоштовного розміщення:

- ✉️ Підтвердження email при реєстрації (RESEND API)
- 📧 Відправка листів із замовленням та посиланням на оплату

## 💳 Тестова оплата

Для тестування платіжної системи WayForPay використовуйте:
- Номер карти: 4242 4242 4242 4242
- Інші дані: будь-які

## 🛠️ Встановлення та запуск

1. Клонуйте репозиторій:
```bash
git clone https://github.com/qurence/upizza.git
```

2. Встановіть залежності:
```bash
npm install
```

3. Створіть файл .env та налаштуйте змінні середовища:
```env
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
RESEND_API_KEY=
```

4. Запустіть проект:
```bash
npm run dev
```

5. Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

---

<a id="english"></a>
# en English version

Modern web application for ordering pizza, built using advanced web development technologies.

## 🌟 Key Features

- 🛒 Online pizza and other dishes ordering
- 👤 Authentication system with support for:
  - Email/Password registration
  - OAuth authorization via Google and GitHub
- 🛍️ Shopping cart with state persistence
- 💳 WayForPay payment system integration
- 📱 Responsive design for all devices
- 🔍 Product filtering and search
- 👥 User personal account

## 🚀 Technologies

### Frontend
- **Next.js 14** - React framework with Server Components support
- **TypeScript** - Typed JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **React Hook Form** - Form handling
- **Zod** - Data validation
- **React Hot Toast** - Notifications

### Backend
- **Next.js API Routes** - Server-side application
- **Prisma** - ORM for database operations
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **WayForPay** - Payment system

### Infrastructure
- **Vercel** - Hosting and deployment
- **GitHub** - Version control system

## 🚨 Important Note

In the current version, some features are disabled for free hosting capability:

- ✉️ Email verification during registration (RESEND API)
- 📧 Sending order confirmation emails with payment links

## 💳 Test Payment

For testing the WayForPay payment system use:
- Card number: 4242 4242 4242 4242
- Other data: any values

## 🛠️ Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/qurence/upizza.git
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file and configure environment variables:
```env
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
RESEND_API_KEY=
```

4. Run the project:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 License

MIT License - feel free to use for your purposes!

## 👨‍💻 Author

Artem Shyposh - [GitHub](https://github.com/qurence)
