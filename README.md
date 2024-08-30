# Note-Taking App

A Node.js and MongoDB application for taking and managing notes. This app includes features such as validators, pagination for the notes table, and functionalities to delete and edit notes.

## Table of Contents

- [General info](#general-info)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)


## General info

The Note-Taking App is a full-stack application that allows users to create, read, update, and delete notes. Built with Node.js, Express, MongoDB, and EJS, it includes features like user authentication, secure routes, and a responsive design using Bootstrap.


## Technologies 
- NodeJs
- MongoDB
- EJs
- Html 
- JavaScript
- CSS
- Bootstrap

## File structure

note-taking-app/
├── __test__
│    ├── connectDB.test.js
│    ├── jwtUtils.test.js
│    └── authController.test.js
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │── app.js
│   └── server.js
│   
│── frontend/
│   ├── public/
│   │   │── styles/
│   │   │   └── main.css
│   │   │-- scripts/
│   │   │   |-- login.js   
│   │   │   |-- notes.js
│   │   │   └── register.js
│   │   └── assets/
│   │    
│   └── views/
│       │-- partials/
│       │   |--footer.ejs
│       │   └──header.ejs
│       │── index.ejs
│       │── login.ejs
│       │── register.ejs
│       └── notes.ejs
│
│-- .env
│-- ADDITIONAL_NOTES.md
│-- package.json
│-- package-lock.json    
└── README.md      

## Features

- User registration and authentication
- CRUD operations for notes
- Responsive front-end design using Bootstrap
- Dynamic data handling with MongoDB
- Server-side validation and error handling


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/davgar2023/note-taking-app.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd note-taking-app
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Start the server:**

    ```bash
    npm start
    ```
   Start the server with nodemon: 

    ```bash
    npm run dev
    ``` 

    Start the Server with Nodemon in Debug Mode:
     ```bash
    npm run debug
    ``` 

    Run Tests:
    
    ```bash
    npm test
    ``` 

## Usage

After starting the server, open your browser and navigate to http://localhost:5000/

the fist page taht will be displayed is Login , you can log in or register in the app.


## Acknowledgments

- Inspiration from various note-taking apps
- Bootstrap for responsive design
- Node.js and Express for backend development
- MongoDB for database management
