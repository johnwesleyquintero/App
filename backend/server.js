import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT (replace with a strong, randomly generated key)
const secretKey = 'your-very-strong-secret-key'; // Replace with a strong key

// Middleware for JWT verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user data to request object
    next();
  });
}

// Example route for protected resource
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected resource accessed successfully', user: req.user });
});

// Example route to generate a token (for testing purposes)
app.post('/login', (req, res) => {
  // In a real application, you would authenticate the user here
  const user = { id: 1, username: 'testuser' }; // Example user
  const token = jwt.sign(user, secretKey);
  res.json({ token });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});