// test/authController.test.js
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('../backend/models/User'); // Adjust the path as needed
const { register, login } = require('../backend/controllers/authController'); // Adjust the path as needed

// Create an Express application for testing
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/register', register);
app.post('/login', login);

jest.mock('../backend/models/User'); // Mock the User model
jest.mock('bcryptjs'); // Mock bcrypt
jest.mock('../backend/config/auth'); // Mock the auth module

describe('Auth Controller', () => {
    beforeAll(async () => {
        // Connect to an in-memory database for testing
        const uri = mongoURI;
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close the connection after tests
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /register', () => {
        it('should register a new user and return a token', async () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
            const mockToken = 'mocktoken';

            // Mock database interactions
            User.findOne.mockResolvedValueOnce(null); // Mock no existing user
            User.prototype.save.mockResolvedValueOnce(mockUser); // Mock user save

            // Mock token generation
            const { generateToken } = require('../backend/config/auth');
            generateToken.mockReturnValueOnce(mockToken); // Mock token generation

            // Send a request to the register endpoint
            const response = await request(app)
                .post('/register')
                .send(mockUser);

            // Assert the expected response
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.msg).toBe(`Welcome : ${mockUser.name}`);
            expect(response.headers['set-cookie'][0]).toContain('jwtToken=mocktoken');
        });

        it('should return an error if the user already exists', async () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'password123' };

            // Mock database interactions
            User.findOne.mockResolvedValueOnce(mockUser); // Mock existing user

            // Send a request to the register endpoint
            const response = await request(app)
                .post('/register')
                .send(mockUser);

            // Assert the expected response
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.msg).toBe('User already exists');
        });
    });

    describe('POST /login', () => {
        it('should log in a user and return a token', async () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' };
            const mockToken = 'mocktoken';

            // Mock database interactions
            User.findOne.mockResolvedValueOnce(mockUser); // Mock user found
            const bcrypt = require('bcryptjs');
            bcrypt.compare.mockResolvedValueOnce(true); // Mock password match

            // Mock token generation
            const { generateToken } = require('../backend/config/auth');
            generateToken.mockReturnValueOnce(mockToken); // Mock token generation

            // Send a request to the login endpoint
            const response = await request(app)
                .post('/login')
                .send({ email: mockUser.email, password: 'password123' });

            // Assert the expected response
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.msg).toBe(`Welcome : ${mockUser.name}`);
            expect(response.headers['set-cookie'][0]).toContain('jwtToken=mocktoken');
        });

        it('should return an error if credentials are invalid', async () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' };

            // Mock database interactions
            User.findOne.mockResolvedValueOnce(mockUser); // Mock user found
            const bcrypt = require('bcryptjs');
            bcrypt.compare.mockResolvedValueOnce(false); // Mock password mismatch

            // Send a request to the login endpoint
            const response = await request(app)
                .post('/login')
                .send({ email: mockUser.email, password: 'wrongpassword' });

            // Assert the expected response
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.msg).toBe('Invalid credentials');
        });
    });
});
