# SurtidoCompleto

This project is a web application for managing products and shopping carts, utilizing Node.js, Express, MongoDB with mongoose and mongoose-paginate-v2 for efficient database operations, Socket.IO for real-time communication, Handlebars for templating, passport for authentication, bcrypt for password encryption, JWT for secure token-based authentication and dotenv for environment variable management.

## Overview

The name "SurtidoCompleto" reflects the idea of providing a complete assortment or full range of products, emphasizing comprehensive and extensive offerings within the project.

## Features

Product management: add, update, delete, and list products with support for pagination, filtering, and sorting.
Cart management: create carts, add products to carts, update product quantities, remove products from carts and view cart details.
Real-time product management with Socket.IO for live updates.
User authentication: Secure user registration and login using JWT, with password encryption via bcrypt.
User roles: Role-based access control with roles such as 'user' and 'admin'.
Current user data: Retrieve the logged-in user's information using a secure endpoint.
User-friendly interface with Handlebars templates and Bootstrap styling.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/GuzmanOlivera/PreEntrega1OliveraFervenzaAlvaroGuzman.git
   ```

2. Navigate to the project directory:

   ```bash
   cd PreEntrega1OliveraFervenzaAlvaroGuzman
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

# Endpoints

## Carts

- `POST /api/carts`: Create a new cart.
- `GET /api/carts/:cid`: Get a cart by its ID.
- `POST /api/carts/:cid/products/:pid`: Add a product to the cart.
- `PUT /api/carts/:cid/products/:pid`: Update a product in the cart. You can optionally specify the desired product quantity in the request body.
- `DELETE /api/carts/:cid/products/:pid`: Remove a product from the cart.

## Products

- `GET /api/products`: Retrieves a paginated list of products with optional filtering and sorting capabilities.
  - It supports the following filters:
    - category (string): Filter products by category.
    - availability (boolean): Filter products by availability. Use true for available products and false for unavailable ones.
  - It also, can sort by price in ascending or descending order:
    -  asc: Sorts products with the lowest price first. 
    -  desc: Sorts products with the highest price first.
- `GET /api/products/:pid`: Get a product by its ID.
- `POST /api/products`: Add a new product.
- `PUT /api/products/:pid`: Update an existing product.
- `DELETE /api/products/:pid`: Delete a product.

## Users

### Authentication

- `POST /api/users/register`: Register a new user. Requires username, first name, last name, email, age, password, and an optional role.
- `POST /api/sessions/login`: Authenticate a user and return a JWT token.
- `GET /api/sessions/current`: Validate the logged-in user and return their associated data.

### CRUD operations

- `GET /api/users/`: Get all users.
- `GET /api/users/:uid`: Get user by its ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:uid`: Update a user.
- `DELETE /api/users/:uid`: Delete a user.

# Project Structure

- `.env`: Environment variables for connecting MongoDB database.
- `src/app.js`: Main application and server configuration.
- `src/config/database.js`: MongoDB database connection and configuration.
- `src/config/passport.config.js`: Passport configuration for user authentication.
- `src/dao/db/cart-manager.js`: Cart management logic.
- `src/dao/db/product-manager.js`: Product management logic.
- `src/dao/models/cart.model.js`: Cart model.
- `src/dao/models/product.model.js`: Product model.
- `src/dao/models/user.model.js`: User model.
- `src/public/js/main.js`: Client-side logic for real-time interaction.
- `src/public/css/style.css`: Custom application styles.
- `src/routes/products.router.js`: Routes for product management.
- `src/routes/carts.router.js`: Routes for cart management.
- `src/routes/sessions.router.js`: Routes for user authentication and session management.
- `src/routes/views.router.js`: Routes for application views.
- `src/util/extract-user-from-token.js`: Middleware for extracting and validating JWT tokens.
- `src/util/util.js`: Utility functions, including bcrypt password encryption.
- `src/views/layouts/main.handlebars`: Main layout for views.
- `src/views/admin.handlebars`: View restricted to admin users.
- `src/views/cartDetail.handlebars`: View for Cart Details.
- `src/views/home.handlebars`: Main view for the product list.
- `src/views/login.handlebars`: User login view.
- `src/views/realTimeProducts.handlebars`: View for real-time product management.
- `src/views/register.handlebars`: User registration view.

### Notes

This project uses MongoDB for data storage and retrieval. Ensure that you have MongoDB configured. Additionally, it is needed to create a .env file in the root directory of the project, following the structure outlined in .env.example, to set up environment variables for connecting to MongoDB.