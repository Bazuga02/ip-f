# Job Application Portal

**[Deployed Project](https://intern-portal-abhi.netlify.app/)**

## Overview

This project is a Job Application Portal that allows users to register, login, and apply for job opportunities. Users can view and update their profile, and see a list of job opportunities with options to apply for them. It features user authentication, profile management, and job application functionalities.

## Features

- **User Authentication**: Secure login and registration system.
- **Profile Management**: View and update user profiles, including profile picture, name, age, and date of birth.
- **Job Opportunities**: Browse through job opportunities, with details including company name, stipend, location, duration, and start date.
- **Apply to Opportunities**: Apply for job opportunities if logged in.
- **Responsive Design**: Optimized for various screen sizes.
- **Notifications**: Informative messages for user actions and errors.

## Technologies Used

- **Frontend**:
  - React
  - React Router DOM
  - Axios
  - React Hot Toast

- **Backend**:
  - Node.js
  - Express
  - MongoDB
    
- **Styling**:
  - Tailwind CSS

## Installation

1. Clone the frontend repository:
    ```bash
    git clone https://github.com/Bazuga02/ip-f.git
    ```

2. Navigate into the frontend project directory:
    ```bash
    cd ip-f
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Clone the backend repository:
    ```bash
    git clone https://github.com/Bazuga02/ip-b.git
    ```

6. Navigate into the backend project directory:
    ```bash
    cd ip-b
    ```

7. Install backend dependencies:
    ```bash
    npm install
    ```

8. Start the backend server:
    ```bash
    npm start
    ```

## Usage

- **Login**: Navigate to `/login` to access the login page.
- **Register**: Navigate to `/register` to create a new account.
- **Dashboard**: Navigate to `/dashboard` to view and update your profile and see applied opportunities.
- **Opportunities**: Browse opportunities and apply directly if logged in.

## API Endpoints

- **POST** `/api/auth/login`: Log in a user.
- **POST** `/api/auth/register`: Register a new user.
- **GET** `/api/users/profile`: Get user profile data.
- **PUT** `/api/users/profile`: Update user profile data.
- **GET** `/api/users/applied-opportunities`: Get a list of applied job opportunities.
- **POST** `/api/opportunities/apply/:id`: Apply for a job opportunity.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
