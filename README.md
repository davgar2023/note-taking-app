# Note-Taking App

A full-stack note-taking application built with Node.js, Express, MongoDB, and EJS. Create, manage, and organize your notes with user authentication and a responsive interface.

## Table of Contents

- [General Info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## General Info

The Note-Taking App is a full-stack application that allows users to create, read, update, and delete notes. Built with Node.js, Express, MongoDB, and EJS, it includes features like user authentication with JWT, data validation, pagination, and a responsive Bootstrap-based UI. Perfect for organizing your thoughts and managing personal notes efficiently.

## Features

- ✅ User registration and authentication with JWT tokens
- ✅ CRUD operations for notes (Create, Read, Update, Delete)
- ✅ Pagination for viewing notes
- ✅ Input validation and error handling
- ✅ Responsive front-end design using Bootstrap
- ✅ Dynamic data handling with MongoDB
- ✅ Server-side validation and error middleware
- ✅ Secure password management
- ✅ Session-based user management
- ✅ Comprehensive test suite

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** EJS (Embedded JavaScript), HTML, CSS, Bootstrap
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** Jest
- **Development Tools:** Nodemon

## File Structure

```
note-taking-app/
├── __test__/
│   ├── connectDB.test.js
│   ├── jwtUtils.test.js
│   └── authController.test.js
│
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection configuration
│   │   └── auth.js            # Authentication configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── noteController.js  # Note CRUD operations
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Note.js            # Note schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   └── noteRoutes.js      # Note endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── errorMiddleware.js # Error handling
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
│
├── frontend/
│   ├── public/
│   │   ├── styles/
│   │   │   └── main.css       # Main stylesheet
│   │   ├── scripts/
│   │   │   ├── login.js       # Login page logic
│   │   │   ├── notes.js       # Notes page logic
│   │   │   └── register.js    # Registration page logic
│   │   └── assets/            # Images and other assets
│   │
│   └── views/
│       ├── partials/
│       │   ├── footer.ejs
│       │   └── header.ejs
│       ├── index.ejs          # Home page
│       ├── login.ejs          # Login page
│       ├── register.ejs       # Registration page
│       └── notes.ejs          # Notes management page
│
├── .env                       # Environment variables (not committed)
├── .gitignore
├── ADDITIONAL_NOTES.md        # Additional documentation
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/davgar2023/note-taking-app.git
    cd note-taking-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Copy the `.env` file and add the following configuration:

    ```plaintext
    MONGO_URI=mongodb://127.0.0.1:27017/note-taking-app
    PORT=5000
    JWT_SECRET=your_secret_key_here
    NODE_ENV=development
    ```

    > **Note:** For MongoDB Atlas, use your cloud connection string: `mongodb+srv://username:password@cluster.mongodb.net/note-taking-app`

4. **Start the server:**

    ```bash
    # Development mode with Nodemon
    npm run dev

    # Production mode
    npm start

    # Debug mode
    npm run debug
    ```

5. **Access the application:**

    Open your browser and navigate to `http://localhost:5000/`

## Usage

1. **Register an account:**
   - Click on the "Register" link on the login page
   - Fill in your username and password
   - Submit the form to create your account

2. **Log in:**
   - Enter your credentials on the login page
   - You'll be redirected to your notes dashboard

3. **Create a note:**
   - Click the "Add Note" button
   - Enter your note title and content
   - Click "Save" to store your note

4. **Edit a note:**
   - Click the edit icon on any note
   - Modify the content
   - Click "Update" to save changes

5. **Delete a note:**
   - Click the delete icon on any note
   - Confirm the deletion

6. **Browse notes:**
   - Use the pagination controls to navigate through your notes
   - Notes are displayed in a responsive table format

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive JWT token |
| POST | `/api/auth/logout` | Logout user |

### Note Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes for authenticated user |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/:id` | Get a specific note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Environment Variables

```plaintext
MONGO_URI          # MongoDB connection string
PORT               # Server port (default: 5000)
JWT_SECRET         # Secret key for JWT signing
NODE_ENV           # Environment (development/production)
```

## Testing

Run the test suite to ensure everything is working correctly:

```bash
npm test
```

This will run tests for:
- Database connection (`connectDB.test.js`)
- JWT utilities (`jwtUtils.test.js`)
- Authentication controller (`authController.test.js`)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspiration from various note-taking apps
- [Bootstrap](https://getbootstrap.com/) for responsive design
- [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for backend development
- [MongoDB](https://www.mongodb.com/) for database management
- [JWT](https://jwt.io/) for secure authentication
