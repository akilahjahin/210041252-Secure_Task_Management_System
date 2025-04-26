# Secure Task Management App - 210041252
## Project Description

This project is a full-stack CRUD (Create, Read, Update, Delete) application with React as the frontend, Express as the backend, and MongoDB as the database. This application features secure user authentication with email verification, role-based access (admin-> AdminPanel and regular user->Dashboard upon logging-in), and JWT-based login.

Users can create, view, update/edit, delete, filer, sort and categorize tasks with details like title, description, due date, and priority. Tasks can be sorted, filtered, and searched. Admins have read-only access to a complete list of users displayed in a table.


## INSTALLATION GUIDE
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

2.  You need to first decide whether to keep cloned .env files for backend and frontend ; Or, you want to modify the .env files as described in "NOTE" below:
3.  You can trust the authors and you have to run backend, frontend individually.

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


4.  You will land on "Home Page" following Vite frontend app link in the frontend terminal > You then have options to LOGIN/ REGISTER > You can use pre-used 3 user-data for easy access and app evaluation. The data is given at end of "NOTE". 3 users consist of both admin, user roles. If you want to use 3 users I set, you cannot change MONGO_URI in the .env I provided in backend (you cloned).
5.  If you REGISTER , **role field can be user/ admin ENUMS** and **email must be 'gmail' only**, you will wait for 5 seconds, a NOTIFICATION will come and say you to check your email. Then **CHECK YOUR SPAM FOLDER IN EMAIL** ; You will receive a verification link from **phythetics23@gmail.com** -- my currently set EMAIL_USER in backend as **the server**. Upon clicking the link, you are verified. Now you can go back to Login page and LOGIN.
6.  After LOGIN, if your role=='admin' you'd be re-directed to AdminPanel page, from where you can just view all users. Not admins. Only users can be viewed. "User Verified" field says whether user has verified their Email. Admin has no other tasks.
7.  After LOGIN, if your role=='user' you'd be re-directed to your respective Dashboard page, from where **you can just view your tasks ONLY; Not the task of any other users**. Then, you can also:
   - First, click on button **"Read My Tasks"** for being able to view all your **currently listed tasks** -- ***below the Create Task form***
   - **Sort tasks** by Priority (high > medium > low)  OR  Due date (ascending)
   - **Filter tasks** by either priority (high/ medium/ low), Category (Task category Name) or Due Date (selected ffrom calender) -- ***You can input 1/ 2/ all 3 fileds for filtering***.
   - Each record on the ***Rendered Task Table List for individual User*** has **Actions** field, allowing us to **'Edit', 'Delete' or 'Mark a task as Completed/ Pending'**.
   - Upon clicking the ***Edit Task*** button, the **Editable task fields open in the 'Create Taks Form' >** From where, **we can UPDATE A TASK successfully**.
   - We can Logout and Login to keep checking functionalities; we can also check for each changes to be consistent with Mongo-Atlas Database.

## NOTE

**You need to create .env file in the backend's root directory, like the following (this example already clones) and there, input your credentials: ONLY IF YOU DON"T WANT TO USER THE EXISTENT .env<backend> CLONED**
  ```bash
     # .env (Backend) -- Currently, I have given my own MONGO_URI for ease of checking APP functionalities but you can also set your own MONGO_URI from the cluster you want to use
     MONGO_URI=mongodb+srv://akilah_252:123abc@cluster0.yjzqylp.mongodb.net/taskManagerDB?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=supersecretkey
     PORT=5000
     
     # email verification -- EMAIL_USER and EMAIL_PASS are used for sending emails from the server
     # Users (normal user/ admin) will receive Registration-Confirmation-Link from EMAIL_USER in their spam folder in GMAIL
     # Your used Email service provider (must be Gmail, since in "//backend/utils/emailService.js", we specified to be Gmail) to send emails from your server
     # the EMAIL_PASS is generated from the server-emails' "App-Passwords facilities provided by Google".
     # To access "App passwords facility" for your server-Gmail account, go to link: https://myaccount.google.com/apppasswords
     # YOU CAN USE YOUR DESIRED email-address FOR 'EMAIL_USER' and generating app-passwords for that, set EMAIL_PASS
     # CURRENT PROVIDED INFO. will help you to easily check
      EMAIL_USER=phythetics23@gmail.com
      EMAIL_PASS=jaul rmlg qrqk yxaf
      CLIENT_URL=http://localhost:5173
   ```
**You need to create .env file in the frontend's root directory, like the following and there, input your credentials: ONLY IF YOU DON"T WANT TO USER THE EXISTENT .env<frontend> CLONED**
   ```bash
     # .env (Frontend)
     VITE_API_URL=http://localhost:5000/api
   ```
**My related MongoDB database has from Atlas:**
**Database: USERS, Collection: users**
You can use the following data (if yu don't want to setup your own mongo-atlas Database, Collection and new data):

I have 3 users uptill now, which can be used for assessing App-functionalities: **(name - email - password - ROLE)**

1. Akilah - akilah.akjabu19@gmail.com - 123 - admin
2. Bushra - brikkhoshaj@gmail.com - 123 - user
3. Jahin - bkhanna6650@gmail.com - 123 - user


## TASK ACCOMPLISHMENTS AND ESSENTIALS (IMPORTANT)
1. **Admin and User roles made.**
2. Both (admin/ user) **upon registration are sent EMAIL-verification-links**. ***The verification email should be in their SPAM-FOLDER.***
3. Upon clicking link, they are **VERIFIED USERS** admin/ user. They can now LOGIN again from Login-Page.
4. Based on **role === 'admin' / 'user'** : they are re-directed to either AdminPanel (when role === 'admin') or Dashboard (role === 'user')
5. Admin can only view users, only. Nothing else. Admins, cannot view other admins. They can only view normal users.
6. Users can be redirected to their own Dashboard page only, not of any other users.
8. They can only retrieve ONLY their own tasks, not tasks of other users.
9. Users can **Create** a NEW TASK
10. Users can **Delete** an existent task
11. Users can **Update/ Edit** an existent task
12. Users can **Mark as Completed/ Pending** an existent task
13. Users can **Filter Tasks** by priority/ category/ due-date or by either 2 or all 3 fields
14. Users can **Sort Tasks** by priority or due-date.
15. Login - LOGOUT have been properly implemented ; Any admin/ user can **LOGOUT** from the Navbar.


## My App Running Videos:
The app's helpful videos, that can help anyone to understand HOW the app works, can be viewed from the following Drive link; **You should visit and see the videos**:

https://drive.google.com/drive/folders/1_zUAOnhgomVbisMLUNwBvSoLDQ5OEhPE?usp=sharing
