// Installation

** Install dependencies:
## `npm install`

//Set up the MongoDB database:
*Install MongoDB on your machine or use a cloud-based solution.
*Update the database connection URL in index.js:
## `mongoose.connect("mongodb://0.0.0.0:27017/helthyfy-pro");`

// API Endpoints

1. User Registration
*Endpoint: POST /register
*Description: Register a new user by providing a JSON payload with username and password.

Example:
{ 
    "name":"John Doe"
    "username":"john_doe"
    "email":"john.doe@example.com"
    "age":28
    "password": "secure_password"
}

2. User Login
*Endpoint: POST /login
*Description: Log in with existing credentials and receive a JWT token.

Example:
{
  "username": "john_doe",
  "password": "secure_password"
}

3. Fetch Food Data
*Endpoint: GET /foods
*Description: Retrieve a list of available food items. Requires a valid JWT token.

4. Search Food by Name
*Endpoint: GET /foods/:name
*Description: Search for food items by name in a case-insensitive manner. Requires a valid JWT token.

5. Insert Tracked Food
*Endpoint: POST /track
*Description: Add tracked food data by providing a JSON payload.

Example:
{
  "userID": "user_id",
  "foodID": "food_id"
}

6. Fetch Single Person's Added Food
*Endpoint: GET /track/:userID/:date
*Description: Retrieve tracked food for a specific user on a given date. Requires a valid JWT token.