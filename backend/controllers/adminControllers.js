const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN_USER = {
  email: 'admin@gmail.com',
  passwordHash: bcrypt.hashSync('admin123', 10),
};

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_USER.email || !bcrypt.compareSync(password, ADMIN_USER.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = { loginAdmin, verifyToken };
