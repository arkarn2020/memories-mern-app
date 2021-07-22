import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

// secrest token
const secret = 'testtoken';

/*
 *** user logins and sends below data
 ***
 *** email
 *** password
 ***
 */

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // search user by email
    const existingUser = await User.findOne({ email });

    // throw an error if user email doesn't exist
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist, Register an account first!" });

    // compare and check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // throw an error if password is incorrect
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    // create a token if password is correct
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: '1h' }
    );

    // send token to user
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // if something goes wrong
    res.status(500).json({ message: 'something went wrong' });
  }
};

/*
 *** user signs up and sends below data
 ***
 *** fname
 *** lname
 *** email
 *** password
 *** confirmPassword
 ***
 */

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // search user by email
    const existingUser = await User.findOne({ email });

    // throw error if already exists
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'user already registered, just login!' });

    // match password and confirmPassword; throw error on mismatch
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'password donot match' });

    // convert plain text password to hash
    const hashPassword = await bcrypt.hash(password, 12);

    // create a new user
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    // create a token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    // send token to user
    res.status(201).json({ result, token });
  } catch (error) {
    // something went wrong
    res.status(500).json({ message: 'something went wrong' });
    console.log(error);
  }
};
