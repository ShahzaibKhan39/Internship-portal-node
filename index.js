const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./db-configuration/connect');

// Route Imports
const internRouter = require('./Routes/Intern');
const authRouter = require('./Routes/auth');
const applicationRouter = require('./Routes/Application');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(express.json());
app.use(
  cors({
    // FIXED: Removed '/login' path to match the base origin required by browsers
    origin: `process.env.FRONTEND_URL`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// API Route Handlers
app.use('/', internRouter);
app.use('/', authRouter);
app.use('/', applicationRouter);

// Catch-all Route for Unmatched Endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} does not exist on this server.`
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server after Database Connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server successfully executing on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB. Server startup aborted:', error);
    process.exit(1);
  }
};

startServer();
