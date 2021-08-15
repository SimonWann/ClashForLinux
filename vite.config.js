import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  path: path.resolve(__dirname, './dist/'),
  plugins: [vue()],
  output: {
    format: 'cjs'
  },
  build: {
    rollupOptions: {
      output: {
        format: 'cjs', // 配置 Rollup 打包输出 CommonJs 格式
      },
      external: ['electron'], // 告诉 Rollup 不要去打包 electron
    },
  },
  optimizeDeps: {
    exclude: ['electron'], // 告诉 Vite 不要转换 electron 模块
  },
})
