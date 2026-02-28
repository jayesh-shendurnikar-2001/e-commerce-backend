# E-commerce Backend API

A Node.js + Express.js backend for an E-commerce application.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- REST API

---

## 📂 Project Structure
server/
│── config/
│ └── db.js
│── controllers/
|   └── authController.js
|   └── cartController.js
|   └── productController.js
│── models/
|   └── Cart.js
|   └── Product.js
|   └── User.js
│── routes/
|   └── authRoutes.js
|   └── cartRoutes.js
|   └── productRoutes.js
│── middleware/
|   └── auth.js
|   └── errorHandler.js
│── server.js


---

## 🌱 Seed Dummy Data

This project includes a **seed file** to insert dummy data into MongoDB.

- Run Seed Script
- node seed.js

## ⚙️ Installation

1️⃣ Clone the repository

```bash
git clone https://github.com/jayesh-shendurnikar-2001/e-commerce-backend.git

2️⃣ Go to project folder

cd server

3️⃣ Install dependencies

npm install

4️⃣ Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

5️⃣ Run the server

npm run dev


🔐 Features

User Authentication (Register / Login)
Password Hashing using bcrypt
JWT Token Authentication
Cart Management
Product Management
Protected Routes