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

// Allowed Origins Array (handles environment variable + fallback defaults)
const allowedOrigins = [
  'https://internship-portal-react.vercel.app',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

// Middleware Setup
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS Policy Error: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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