import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $api: path.resolve(__dirname, 'src/api'),
      $components: path.resolve(__dirname, 'src/components'),
      $hooks: path.resolve(__dirname, 'src/hooks'),
      $lib: path.resolve(__dirname, 'src/lib'),
      $redux: path.resolve(__dirname, 'src/redux'),
      $routes: path.resolve(__dirname, 'src/routes'),
    },
  },
  base: '/dsa-board/',
});
