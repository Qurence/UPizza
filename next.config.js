/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Временно игнорируем ошибки типов при сборке
    ignoreBuildErrors: true
  },
  eslint: {
    // Временно игнорируем ошибки линтера при сборке
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig 