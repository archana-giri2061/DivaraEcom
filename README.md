Divara Ecommerce — Backend API
Final Internship Project  ·  Muktinath itech Ltd  ·  Archana Giri  ·  6 July – 5 October 2025
Project Overview
Divara is a full-stack ecommerce web application built as the final deliverable of the 60-day backend internship at Muktinath itech Ltd, Basundhara, Kathmandu. The backend is a REST API server built with TypeScript, TypeORM, and MySQL, providing complete CRUD operations for User, Product, Order, and Authentication modules. The frontend is a React + TypeScript application providing a full ecommerce interface including admin dashboard, product catalogue, cart, checkout, and order management.
Tech Stack
Backend
•	Node.js v20 LTS — JavaScript runtime
•	TypeScript — Typed JavaScript with strict mode
•	Express.js — HTTP server and routing
•	TypeORM — ORM for MySQL database
•	MySQL — Relational database
•	JWT (jsonwebtoken) — Authentication tokens
•	bcrypt — Password hashing
Frontend
•	React 18 + TypeScript — UI framework
•	Vite — Build tool and dev server
•	React Router — Client-side routing
•	Context API (AuthContext) — Authentication state management
Project Structure
Backend (/backend/src/)
•	config/data-source.ts — TypeORM MySQL connection configuration
•	entities/ — User.ts, Product.ts, ProductVariant.ts, Order.ts
•	controllers/ — auth.controller.ts, product.controller.ts, order.controller.ts
•	middleware/ — auth.middleware.ts (JWT token validation)
•	index.ts — Express server setup, middleware stack, route registration
Setup Instructions
Prerequisites
Node.js v20 LTS, MySQL 8.0, and Git must be installed on your machine.
1. Clone the repository
git clone <repository-url>
cd divara/backend
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the /backend directory with the following variables:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=divara_db
JWT_SECRET=your_jwt_secret_key
PORT=3000
4. Create the MySQL database
CREATE DATABASE divara_db;
5. Run the server
npm run dev
TypeORM synchronise:true will auto-generate all tables on first run. Verify with SHOW TABLES in MySQL Workbench.
API Endpoints
Authentication
Method	Endpoint	Description	Auth Required
POST	/auth/register	Register a new user with bcrypt password hash	No
POST	/auth/login	Login and receive JWT access token	No
GET	/users	Get all users	Yes (JWT)
GET	/users/:id	Get user by ID	Yes (JWT)
POST	/users	Create a new user	Yes (JWT)
PUT	/users/:id	Update user by ID	Yes (JWT)
DELETE	/users/:id	Delete user by ID — returns 204	Yes (JWT)
GET	/products	Get all products (supports ?keyword= ?startDate= ?endDate=)	No
GET	/products/:id	Get product by ID	No
POST	/products	Create a new product — returns 201	Yes (JWT)
PUT	/products/:id	Update product by ID	Yes (JWT)
DELETE	/products/:id	Delete product by ID — returns 204	Yes (JWT)
GET	/orders	Get all orders with User and Product relations	Yes (JWT)
GET	/orders/:id	Get order by ID with relations	Yes (JWT)
POST	/orders	Create a new order — returns 201	Yes (JWT)
PUT	/orders/:id	Update order by ID	Yes (JWT)
DELETE	/orders/:id	Delete order by ID — returns 204	Yes (JWT)
GET	/coupons	Get coupons (supports ?type= filter)	Yes (JWT)
