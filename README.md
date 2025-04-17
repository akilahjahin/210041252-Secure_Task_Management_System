# Secure Task Management App - 210041252
## Project Description

This project is a full-stack CRUD (Create, Read, Update, Delete) application with React as the frontend, Express as the backend, and MongoDB as the database. This application features secure user authentication with email verification, role-based access (admin and regular user), and JWT-based login. Users can create, view, update, delete, and categorize tasks with details like title, description, due date, and priority. Tasks can be sorted, filtered, and searched. Admins have read-only access to a complete list of users displayed in a table.


## Installation Guide
1. **Clone the repository**
   - Create a folder naming it, e.g. SecureTask_252 (or something else according to preference)
   - Right click and open in terminal where, clone the project:
   - 
  ```bash
   git clone https://github.com/akilahjahin/210041252-Secure_Task_Management_System.git
   ```
  - To open the code with VSCode, after successfully cloning, write:
  ```bash
   code .
   ```

2. You can trust the authors and you have to run backend, frontend individually.

## Project Run Commands
1. **Backend:**
   Open a new terminal, navigate to backend and install dependencies before running
   ```bash
   npm install
   npm run dev
   ```

2. **Frontend:**
  Open a new terminal, navigate to frontend and install dependencies before running
   ```bash
   npm install
   npm run dev
   ```



## NOTE

**You need to create .env file in the backend's root directory, like the following and there, input your credentials:**
  ```bash
     # .env (Backend)
     PORT=5000
     DB_URI=mongodb://localhost:27017/yourDatabaseName
     
     # JWT settings
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRATION=1h
     
     # Email configuration for verification or password reset
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     
     # Frontend client URL for email links (e.g., verification or reset)
     CLIENT_URL=http://localhost:3000
   ```
**You need to create .env file in the frontend's root directory, like the following and there, input your credentials:**
   ```bash
     # .env (Frontend)
     VITE_API_URL=http://localhost:5000/api
     VITE_APP_NAME=MyApp
   ```
**My related MongoDB database has from Atlas:**
**Database: USERS, Collection: users**

