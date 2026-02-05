# 📝 Lightweight Feedback System

This is a full-stack feedback sharing platform built for internal use between managers and employees in an organization. It enables structured, ongoing feedback in a simple, secure, and friendly interface.

---

## 🚀 Features

### ✅ Core Functionality (MVP)
- User Authentication with JWT
- Role-based access (Manager / Employee)
- Manager can submit structured feedback:
  - Strengths
  - Areas to improve
  - Sentiment (Positive/Neutral/Negative)
- Employee can view feedback history and acknowledge feedback
- Dashboards:
  - Manager: Feedback form + employee list
  - Employee: Feedback timeline
- Backend protected via role-based permissions

---

## ⚙️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + TailwindCSS |
| Backend | Django REST Framework |
| Auth | JWT (via SimpleJWT) |
| Database | PostgreSQL |
| DevOps | Docker (backend only) |

---

## 🧠 Design Decisions

- **Role-based rendering**: UI and routes change dynamically based on logged-in user's role.
- **Secure feedback access**: Employees can only see their own feedback. Managers can only access users they created feedback for.
- **Clean, minimal UX** using Tailwind CSS.
- **Dockerized backend**: Ensures portability and fast spin-up using PostgreSQL DB.

---

## 📦 Setup Instructions

### ⚙️ Prerequisites
- Node.js
- Docker + Docker Compose
- Git

---

### 💻 Clone the project

```bash
git clone https://github.com/YOUR_USERNAME/feedback-system.git
cd feedback-system
````

---

### 🔧 Backend Setup (Dockerized)

```bash
# Start backend and Postgres DB
docker-compose up --build

# In another terminal, create Django DB tables
docker-compose exec backend python manage.py migrate

# Create admin user (optional)
docker-compose exec backend python manage.py createsuperuser
```

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Make sure backend is running at: `http://localhost:8000`
Frontend runs at: `http://localhost:3000`

---

## 📂 Project Structure

```
feedback-system/
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── feedback/ (Django app)
│   └── manage.py
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## 🐳 Docker

Docker is used **only for the backend** as required. PostgreSQL runs as a service in the container with volume persistence.

---

## 🔐 Sample Roles

* You can create manager/employee users via signup page.
* Roles are assigned during signup (`manager` or `employee`).
* Alternatively, use Django admin panel for manual user creation:
  `http://localhost:8000/admin`

---


## 🤖 AI Usage Disclaimer

Some code snippets and structures were assisted using AI (ChatGPT), but all logic, structure, and final decisions were reviewed and implemented manually.

---


## 👋 Author

**Neelakanteswar Bathula**
Built as part of a paid internship application task.
Tech enthusiast, passionate about clean UI and scalable backend.
