const mongoose = require('mongoose');
const connectDB = require('../backend/config/db'); // Adjust the path as needed

jest.mock('mongoose'); // Mock mongoose to avoid actual database connection during tests

describe('connectDB', () => {

    let originalExit;
    let originalConsoleLog;
    let originalConsoleError;

    beforeAll(() => {
       // Save the original process.exit, console.log, and console.error functions
        originalExit = process.exit;
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        
      });




  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    process.exit = jest.fn(); // Mock process.exit to avoid exiting the process
    console.log = jest.fn(); // Mock console.log to capture log outputs
    console.error = jest.fn(); // Mock console.error to capture error logs
  });

  afterAll(() => {
    // Restore the original process.exit function after tests
    process.exit = originalExit;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  it('should connect to MongoDB successfully', async () => {
    mongoose.connect.mockResolvedValueOnce(); // Mock a successful connection
    await connectDB(); // Call the function
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(console.log).toHaveBeenCalledWith('MongoDB connected'); // Check if success message was logged
  });

  it('should handle connection errors', async () => {
    const error = new Error('Connection failed');

    mongoose.connect.mockRejectedValueOnce(error); // Mock a failed connection
  
    await connectDB(); // Call the function
    expect(console.error).toHaveBeenCalledWith('MongoDB connection error:', error); // Check if error message was logged
    expect(process.exit).toHaveBeenCalledWith(1); // Check if process.exit was called with 1
  });
});
