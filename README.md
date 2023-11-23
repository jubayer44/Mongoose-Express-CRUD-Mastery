# Mongoose Express CRUD Mastery Assignment.
- ### Application Summary
- #####  This is a Node.js Express application with TypeScript as the programming language and MongoDB with Mongoose for user data and order management. It utilizes MongoDB through Mongoose for data storage, use bcrypt for password hashing, and incorporates Zod for input validation. The application includes eight routes for creating, retrieving, updating, and deleting users, as well as managing user orders.

- ### Local Setup Instructions
- Clone the repository
 ```git clone https://github.com/jubayer44/Mongoose-Express-CRUD-Mastery.git```
- Navigate to the project directory
```cd your-folder```
- Install dependencies
```npm install```
- Create a```.env``` file in the root of the project and set the following environment variables
 ```
PORT = 5000
DB_URL = your mongodb_url
BCRYPT_SALT_ROUNDS = 12
```
##### Running the application
- Development Mode
```npm run dev```
- Production Mode
```
npm run build
npm start
```
##### Testing Application
- To run linting and prettier checks
```
npm run lint:check
npm run prettier:check
```
- To automatically fix linting and prettier issues
```
npm run lint:fix
npm run prettier:fix
```
##### API Endpoints
- POST /api/users: Create a new user.
- GET /api/users: Get all users.
- GET /api/users/:userId: Get a single user by ID.
- PUT /api/users/:userId: Update a user by ID.
- DELETE /api/users/:userId: Delete a user by ID.
- PUT /api/users/:userId/orders: Add a new product to a user's orders.
- GET /api/users/:userId/orders: Get all orders for a user.
- GET /api/users/:userId/orders/total-price: Get the total price of all orders for a user.

