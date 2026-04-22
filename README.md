# VinitaPrimeTrade.ai-
A full-stack task management application built with the MERN stack, featuring secure user authentication using JWT, role-based access control (user and admin), and complete CRUD functionality for tasks. The backend is designed with a scalable and modular architecture, including API versioning, validation, and centralized error handling.
# 🚀 Task Management Application (MERN Stack)

A full-stack task management application with secure authentication, role-based access control, and CRUD operations. Built using **Node.js, Express, MongoDB, and React**, this project demonstrates backend-focused development with a scalable and production-ready architecture.

Here is the link of postman collection with API documention: https://team99-0652.postman.co/workspace/PrimeTrade.ai~99d6552f-5e67-49fe-b192-86e3afb76a74/collection/38266609-6bde055d-bff7-4966-86fe-aadc990d4cb3?action=share&creator=38266609
---

## 📌 Features

### 🔐 Authentication & Authorization

* User Registration & Login (JWT-based)
* Password hashing using bcrypt
* Protected routes using middleware
* Role-based access control (User vs Admin)

---

### 📋 Task Management

* Create tasks
* View tasks

  * Users → Only their tasks
  * Admin → All tasks
* Update tasks (own tasks or admin)
* Delete tasks (admin only)

---

### 🛡️ Security

* JWT authentication with expiration
* Input validation using express-validator
* Password hashing
* Rate limiting to prevent abuse

---

### 🧱 Backend Architecture

* RESTful API design
* API versioning (`/api/v1`)
* Modular structure (controllers, routes, middleware)
* Centralized error handling

---

### 🎨 Frontend

* Built with React + Vite
* Styled using Tailwind CSS
* Fetch API for backend communication
* Protected dashboard
* Role-based UI (admin vs user)

---

## 🗄️ Database Schema

### 👤 User

* name: String (required)
* email: String (required, unique)
* password: String (hashed)
* role: String (`user` | `admin`)
* createdAt, updatedAt

---

### 📌 Task

* title: String (required)
* description: String
* createdBy: ObjectId (ref: User)
* status: String (optional)
* priority: String (optional)
* createdAt, updatedAt

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/v1/auth/register` | Register new user  |
| POST   | `/api/v1/auth/login`    | Login & get JWT    |
| GET    | `/api/v1/auth/profile`  | Get logged-in user |
| GET    | `/api/v1/auth/admin`    | Admin-only route   |

---

### 📋 Task Routes

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/api/v1/tasks`     | Create task                  |
| GET    | `/api/v1/tasks`     | Get tasks (user/admin logic) |
| PUT    | `/api/v1/tasks/:id` | Update task                  |
| DELETE | `/api/v1/tasks/:id` | Delete task (admin only)     |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Testing

Use Postman collection included in the repository:

```bash
postman_collection.json
```

---

## 🔑 Authentication

Include JWT token in headers:

```bash
Authorization: Bearer <token>
```

---

## 👑 Admin Access

Admin users are created manually in the database with:

```json
"role": "admin"
```
For now I have created a admin with these credentials:
email: vinita1@gmail.com
password: 123456

---

## 📈 Scalability Notes

* Modular architecture allows easy addition of new features
* API versioning ensures backward compatibility
* Rate limiting improves system stability under load
* Can be extended with:

  * Redis caching
  * Microservices architecture
  * Load balancing

---

## 🚀 Future Improvements

* Pagination & filtering
* Search functionality
* Notifications / Toast UI
* Docker deployment
* CI/CD pipeline

---

## 🧑‍💻 Author

**Vinita Gurnani**

---

## ⭐ Conclusion

This project demonstrates strong backend fundamentals, secure authentication, and scalable architecture, making it suitable for backend development internships and real-world applications.
