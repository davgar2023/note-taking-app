// test/jwtUtils.test.js

const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../backend/config/auth'); // Adjust the path as needed

jest.mock('jsonwebtoken'); // Mock jsonwebtoken to avoid real JWT signing/verification

describe('JWT Utilities', () => {
    const mockSecret = 'mocksecret';
    const mockUser = { id: '123' };
    const mockToken = 'mocktoken';
    const mockDecoded = { user: { id: '123' } };

    beforeAll(() => {
        process.env.JWT_SECRET = mockSecret; // Set a mock secret for testing
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('generateToken', () => {
        it('should generate a JWT token', () => {
            jwt.sign.mockReturnValueOnce(mockToken); // Mock jwt.sign to return a mock token

            const token = generateToken(mockUser);

            expect(token).toBe(mockToken); // Check if the returned token is as expected
            expect(jwt.sign).toHaveBeenCalledWith(
                { user: { id: mockUser.id } },
                mockSecret,
                { expiresIn: '1h' }
            ); // Verify jwt.sign was called with correct parameters
        });
    });

    describe('verifyToken', () => {
        it('should return decoded token if valid', () => {
            jwt.verify.mockReturnValueOnce(mockDecoded); // Mock jwt.verify to return decoded payload

            const decoded = verifyToken(mockToken);

            expect(decoded).toEqual(mockDecoded); // Check if the decoded token is as expected
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret); // Verify jwt.verify was called with correct parameters
        });

        it('should return null if token is invalid', () => {
            jwt.verify.mockImplementationOnce(() => { throw new Error('Invalid token'); }); // Mock jwt.verify to throw an error

            const decoded = verifyToken(mockToken);

            expect(decoded).toBeNull(); // Check if null is returned on error
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret); // Verify jwt.verify was called with correct parameters
        });
    });
});
