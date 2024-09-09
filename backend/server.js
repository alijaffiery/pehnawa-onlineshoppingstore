const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Use bcryptjs

const app = express();
const secretKey = 'yourSecretKey'; // Replace with your own secret key
app.use(express.json());
// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Simulated database to store users
let users = []; // Initialize an empty array
console.log(users,"user");
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the simulated database
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Compare plaintext password with hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    // Passwords match, authentication successful
    res.json({ message: 'Authentication successful' });
  } else {
    // Passwords don't match, authentication failed
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
