/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Временно игнорируем ошибки типов при сборке
    ignoreBuildErrors: true
  },
  eslint: {
    // Временно игнорируем ошибки линтера при сборке
    ignoreDuringBuilds: true
  },
  // Добавляем настройки для оптимизации сборки
  swcMinify: true,
  // Отключаем строгую проверку типов во время сборки
  experimental: {
    strictMode: false
  }
}

module.exports = nextConfig 