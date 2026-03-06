import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Cho phép Vite xử lý file .glb như static asset (trả về URL, không parse như JS)
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      // Điều này giúp Vite hiểu được các đường dẫn tuyệt đối từ thư mục src
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "assets": path.resolve(__dirname, "./src/assets"),
      // Thêm các folder khác nếu cần
    },
  },
  // Thêm đoạn cấu hình này để xử lý lỗi Esbuild
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    host: '127.0.0.2',
    port: 5000,
    strictPort: true,
    cors: true, // Thêm cors để tránh việc bị chặn khi gọi API từ IP khác
    proxy: {
      '/api': {
        target: 'http://api.3dprintshop.store',
        changeOrigin: true,
      }
    },
    fs: {
      strict: false // Cho phép truy cập file linh hoạt hơn
    }
  }
})