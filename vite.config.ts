
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset/93eb455b577b9c7102cf6e387baafcdccea491ab.png': path.resolve(__dirname, './src/assets/93eb455b577b9c7102cf6e387baafcdccea491ab.png'),
      'figma:asset/8b4ccd3d5dd65a167318db0156b9361d28a23b41.png': path.resolve(__dirname, './src/assets/8b4ccd3d5dd65a167318db0156b9361d28a23b41.png'),
      'figma:asset/4fc704712af3fc91de82ff2fda416c9669517bcc.png': path.resolve(__dirname, './src/assets/4fc704712af3fc91de82ff2fda416c9669517bcc.png'),
      'figma:asset/1ea4b6ba40a4c707783cc76ce229e8b17dde011e.png': path.resolve(__dirname, './src/assets/1ea4b6ba40a4c707783cc76ce229e8b17dde011e.png'),
      'figma:asset/1a242abb72081324825cf810af0b1d5dd308a77d.png': path.resolve(__dirname, './src/assets/1a242abb72081324825cf810af0b1d5dd308a77d.png'),
    },
  },
  server: {
    port: 3000,
  },
});
