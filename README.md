# MERN Example Video Code

A full-stack web application that allows users to register, log in, and view their profile using the MERN stack (MongoDB, Express.js, React, Node.js) and JWT authentication.

---

## Project Structure

```
MERN-Profile-App/
│
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       └── ...
│
├── server/               # Express backend
│   ├── model/
│   │   └── User.js
│   ├── index.js
│   └── .env
│
├── README.md
└── Diagram.md            # Optional: Project architecture or data flow
```

---

## Tools and Features

- User Registration & Login with hashed passwords
- JWT Authentication
- Protected Profile Route
- React Bootstrap for UI
- Full-stack setup with `vite` on the client

## Technologies

- Frontend: React, React-Bootstrap, Vite
- Backend: Express, Node.js, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Tooling: dotenv and GitHub

---

## Installation

### 1. Clone the repository

Use the clone button, or create a codespaces from the project.

### 2. Install dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

---

## Environment Variables

Edit the `.env` file inside the `server/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Running the App

### 1. Start the server
You can either install nodemon or go with node index.js

```bash
cd server
node index.js
```

### 2. Start the client

```bash
cd client
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Route                | Description            |
|--------|----------------------|------------------------|
| POST   | /api/auth/register   | Register a new user    |
| POST   | /api/auth/login      | Log in and receive JWT |
| GET    | /api/profile         | Get user profile (JWT protected) |
