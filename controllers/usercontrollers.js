import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Sign Up
export async function signUp(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
   } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      
      return res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          userId: user._id.toString() 
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}