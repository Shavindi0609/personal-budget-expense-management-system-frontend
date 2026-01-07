import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // මෙම පේළිය අනිවාර්යයෙන් එක් කරන්න
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // මෙහිදී react() ශ්‍රිතය අනිවාර්යයෙන් අඩංගු විය යුතුය
    tailwindcss(),
  ],
  base: '/', // paths නිවැරදිව හඳුනා ගැනීමට මෙය වැදගත් වේ
})