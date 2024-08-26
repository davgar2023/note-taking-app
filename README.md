# Note-Taking App

A Node.js and MongoDB application for taking and managing notes. This app includes features such as validators, pagination for the notes table, and functionalities to delete and edit notes.

## Table of Contents

- [General info](#general-info)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)


## General info
This project is an application for taking and using cookies  


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
│    ├── authController.test.js
│    ├──
│    ├──
│    └──
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
│-- package.json
│-- package-lock.json    
└── README.md      


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

http://localhost:5000/

the fist page taht will be displayed is Login , you can log in or register in the app.


