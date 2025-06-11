# 📝 Note-App

A fullstack TypeScript CRUD Notes application built with React + Vite + SCSS (frontend) and Express + Node.js (backend).

---

## ✨ Features

* TypeScript on both frontend and backend
* React + Vite for fast and modern UI
* SCSS modules for clean and scalable styling
* Express REST API: `GET`, `POST`, `PUT`, `DELETE`
* Notes stored in `notes.json`
* Inline editing directly in the note card
* Search notes by title
* Sort notes by date (ascending/descending toggle)
* Responsive design for mobile and desktop
* Deployment:

  * Frontend: GitHub Pages
  * Backend: Render

---

## 🛠️ Installation & Local Development

### 1. Clone the repository

```bash
git clone https://github.com/ansofidev/Note-App.git
cd Note-App
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

### 3. Run the application

#### Backend (port `3001`)

```bash
npm run dev
```

#### Frontend (port `5173`)

```bash
cd ../frontend
npm run dev
```

---

## 🌐 Live Demo

* **Frontend (GitHub Pages):** [https://ansofidev.github.io/Note-App](https://ansofidev.github.io/Note-App)
* **Backend (Render):** [https://note-app-4xg5.onrender.com/notes](https://note-app-4xg5.onrender.com/notes)

---

## 🚀 Deployment

### GitHub Pages (Frontend)

Make sure your `package.json` includes:

```json
"homepage": "https://ansofidev.github.io/Note-App",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then deploy with:

```bash
npm run deploy
```

### Render (Backend)

* Link the repo on [https://render.com](https://render.com)
* Set the start command:

```bash
npm run dev
```

* Set build command (if any):

```bash
npm install
```

---

## ✉️ License

MIT License. Built by [@ansofidev](https://github.com/ansofidev).
