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
  console.log('Login attempt: ', { email, password });

  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      console.log('User found: ', user);

      // If the user doesn't exist, return an error
      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // Admin login check (can be moved to a config or environment variable for security)
      if (email === "admin@gmail.com" && password === "admin") {
          console.log('Admin login successful');
          return res.status(200).json({ 
              success: true, 
              message: 'Logged in successfully as admin',
              isAdmin: true // Add this flag to indicate it's an admin login
          });
      }

      // For non-admin users, check if the password is correct (bcrypt comparison)
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match: ', isMatch);

      // If the password is incorrect, return an error
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // For non-admin users, return a success message
      console.log('User login successful');
      return res.status(200).json({ success: true, message: 'Logged in successfully' });

  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
  }
}
