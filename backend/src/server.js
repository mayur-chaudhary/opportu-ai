const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or kill the process using this port.`);
    process.exit(1);
  } else {
    console.error('Error starting server:', err);
    process.exit(1);
  }
});
