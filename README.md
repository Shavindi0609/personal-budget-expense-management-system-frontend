# Personal Budget & Expense Management System

A full-stack web application to help users manage their personal finances, track expenses, and set savings goals. This project provides a clean UI, authentication (email/password + Google OAuth), and a responsive design.

---

## 🛠 Technologies & Tools Used

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- Axios
- @react-oauth/google

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render / Railway
- MongoDB: Atlas

---

## 🚀 Features

- User registration and login (email/password & Google OAuth)
- Password strength validation
- Dashboard for tracking expenses
- Set and track savings goals
- Responsive design for desktop and mobile
- Secure JWT-based authentication
- Beautiful UI with Tailwind CSS

---

## ⚡ Screenshots

**Web Pages**  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/413eb64e-20e8-4432-8a02-f498956ea019" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/70fd4f71-29f6-409a-bcfa-4a96a48c38c6" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20fc332a-2a2d-43f9-8065-2dfdde847edd" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c83b869-227b-461d-bbff-c8edd9eb41fd" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/59cdbd06-3537-4db8-98cf-0b88891ef542" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f8958a9d-e0d3-437a-aca8-88d1e4701509" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/07795231-840b-4e0d-8efa-475e79235bad" />


**Register Page**  
<img width="1920" height="1080" alt="Screenshot (750)" src="https://github.com/user-attachments/assets/edcd2dd2-1cb4-4961-bedb-ad7e6f0e5ed6" />

**Login Page**  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d6b1de1e-54b9-4e62-83b2-aef143c96b27" />


**Dashboard**  
![Dashboard](./screenshots/dashboard.png)

---

## 📦 Setup & Run Instructions

### Backend
1. Clone the repo and navigate to the backend folder:
   ```bash
   git clone <your-repo-url>
   cd backend
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
