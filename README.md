
# Forget Vault - Password Manager

<img src="./src/assets/forget vault.PNG">

Forget Vault is a secure and easy-to-use password manager built with React, Express, MongoDB, and Tailwind CSS. It allows users to store, manage, and retrieve their passwords locally in a MongoDB database, ensuring privacy and security.

## Features
- **Secure Authentication**: Sign in and out with your credentials. Important pages like `/manage-passwords` and `/see-passwords` require a valid password for access.
- **Account Management**: View your account details on the `/accounts` page. If you forget your password, click the "Forget Password" button to have it sent to your email.
- **Password Creation**: Create new passwords on the `/create-passwords` page by providing the website name and password.
- **Password Management**: Update or delete your passwords on the `/manage-passwords` page.
- **Password Viewing**: View all your stored passwords in a table format on the `/see-passwords` page.
- **Dashboard**: On the homepage, view the total number of passwords you have stored.

## Installation and Setup

1. **MongoDB Setup**:  
   In your local MongoDB, create a database called `password_manager` with two collections:
   - `users`: Add a record `{ email: "NULL", password: "NULL" }`.
   - `passwords`: This collection can remain empty.

2. **Install Dependencies**:  
   Run the following commands to install all necessary dependencies:
   ```bash
   npm i
   npm i express mongoose react-toastify react-router-dom cors nodemailer react-hook-form autoprefixer
   npm install -D tailwindcss
   npx tailwindcss -p
   ```

3. **Run the Application**:
   Open two terminals:
   - In the first terminal, run:
     ```bash
     npm run dev
     ```
   - In the second terminal, run:
     ```bash
     nodemon server.js
     ```

4. **Step Complete**:  
   You're now ready to use Forget Vault! All passwords and user data are securely stored in your local MongoDB database.

## Security
Forget Vault stores all data locally in MongoDB, ensuring that your passwords are not stored in an external database or accessed by unauthorized third parties.

## Popular Libraries Used
- **React**: Frontend framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Express**: Backend web framework for building the API.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **React-Toastify**: For displaying elegant toast notifications.
- **React Router DOM**: Client-side routing for React.
- **Nodemailer**: For sending emails (used in the "Forget Password" feature).
- **React Hook Form**: Form handling and validation in React.

## Contact
For any inquiries or support, please reach out to me at:  
**Email**: yashodhar2907@gmail.com
