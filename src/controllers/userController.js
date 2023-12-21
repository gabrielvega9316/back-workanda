const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/dbConfig'); 
const { secretKey } = require('../../config/jwtConfig');
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository(db);

class UserController {

  async getAllUsers(req, res) {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async createUser(req, res) {
    const { username, password, email } = req.body;
    try {
      const existingUser = await userRepository.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'User name is already in use' });
      }

      const existingEmail = await userRepository.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userRepository.createUser(username, hashedPassword, email);
      res.json({ message: 'User successfully created' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async updateUser(req, res) {
    const userId = req.params.id;
    const { username, email } = req.body;
    try {
      const existingUser = await userRepository.getUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userRepository.updateUser(userId, username, email);
      res.json({ message: 'User successfully updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const existingUser = await userRepository.getUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await userRepository.deleteUser(userId);
      res.json({ message: 'User successfully updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userRepository.getUserByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '3h' });

      res.status(200).json({
        success: true,
        data: username,
        token: token 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
