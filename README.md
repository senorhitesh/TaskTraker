# ✅ Task Tracker — GitHub Contribution Graph Style

A visual task tracker built with **pure Vanilla JavaScript** — no frameworks, no libraries. Tracks your daily consistency and visualizes it as a GitHub-style contribution graph.

---

## 🎯 Why Vanilla JS?

This project was intentionally built without React, Vue, or any frontend framework. The goal was to deeply understand **state management**, **DOM manipulation**, and **date logic** from scratch — mastering the *how* before the *what*.

---

## ✨ Features

- 📅 **GitHub-style Contribution Graph** — visualize your task consistency day by day
- 💾 **localStorage Persistence** — tasks are saved across page refreshes with no backend needed
- 🗓️ **Custom Date Logic** — dates mapped across different months and years, written from scratch without any date library
- ➕ **Add & Track Tasks** — log tasks per day and watch your graph fill up
- 🎨 **Clean UI** — minimal, GitHub-inspired design

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling & graph layout |
| Vanilla JavaScript | All logic, DOM, state, date handling |
| localStorage | Client-side data persistence |

> Zero dependencies. Zero frameworks. Just the web platform.

---

## 🚀 Getting Started

No install or build step needed — just open and run.

```bash
# Clone the repository
git clone https://github.com/your-username/task-tracker.git

# Open in browser
cd task-tracker
open index.html
```

Or just double-click `index.html` — it works offline too.

---

## 📁 Project Structure

```
├── index.html        # Main HTML file
├── style.css         # Styling and contribution graph layout
└── script.js         # All JS logic — tasks, dates, localStorage, DOM
```

---

## 🧠 Key Challenges Solved

### 📆 Date Manipulation Without Libraries
Built custom logic to extract, map, and iterate dates across month and year boundaries — the kind of thing `date-fns` would normally handle, done from scratch.

### 🗃️ State Without a Framework
Managed all app state in plain JS objects, syncing to `localStorage` on every change and re-rendering the graph on load — a hands-on lesson in what React is actually doing under the hood.

---

## 📸 Screenshots

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/7f7663c5-7785-487d-bf2a-c28f76df7e09" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3abb85c6-85ed-4229-a12d-1feb770c7db7" />


---

## 📄 License

[MIT](LICENSE)

---

> ⭐ Star this repo if you found it useful or inspiring!
