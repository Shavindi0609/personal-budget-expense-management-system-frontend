import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // මේක අනිවාර්යයෙන්ම තියෙන්න ඕනේ
    tailwindcss(),
  ],
  base: '/', // paths නිවැරදිව වැඩ කිරීමට මෙය එක් කරන්න
})