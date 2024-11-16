# PayTM Wallet (Basic Version)

A basic implementation of the PayTM wallet that allows users to perform essential wallet functions like signup, signin, transfer money to other registered users and update their profiles.


## Introduction

This project is a simplified version of the PayTM wallet built as a MERN (MongoDB, Express, React, Node.js) stack application. It simulates a wallet system with essential functionalities such as:

- User registration and login.
- Transferring money to other registered users on the platform using a dummy balance.
- Updating user profiles.

## Features

- **User Authentication**: Signup and Signin functionality.
- **Money Transfers**: Transfer funds between users within the platform.
- **Profile Management**: Update user details.
- **Dummy Balance Management**: Preloaded dummy balance for testing transactions.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js and npm installed.
- MongoDB running locally or hosted (e.g., MongoDB Atlas).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ganeshburri/PayTM.git
   ```
2. Backend Setup
   ```bash
   cd backend
   npm install
   node index.js
   ```
3. Frontend Setup
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Make sure to setup environment variables before running project locally:<br>
   Configure the environment variables for backend as follows:
   ```bash
   MONGO_URL=<Your MongoDB connection string>
   JWT_SECRET=<Your secret key for JWT authentication>
   ```
   Configure the environment variables for frontend as follows:
   ```bash
   VITE_BACKEND_URL=<Your backend url>
   ```
   
