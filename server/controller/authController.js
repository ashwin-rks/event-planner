const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require('../middleware/authMiddleware');



const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If user not found
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.userType }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10h" } 
    );

    return res.status(200).json({
      token,
      user: {
        userType: user.userType
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { first_name, last_name, userType, email, password } = req.body;

    // Check for required fields
    if (!email || !password || !first_name || !last_name || !userType) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        userType: userType,
        email: email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};

const validate = async (req, res) => {
  return res.status(200).json({ message: 'Token is valid', user: req.user });
}

module.exports = {
  login,
  signup,
  validate,
};
