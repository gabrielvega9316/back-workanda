const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/dbConfig'); 
const { secretKey } = require('../../config/jwtConfig');
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository(db);

class UserController {
    // Obtener todos los usuarios
    async getAllUsers(req, res) {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un usuario por ID
  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo usuario
  async createUser(req, res) {
    const { username, password, email } = req.body;
    try {
      // Validar si el usuario ya existe con ese nombre o email
      const existingUser = await userRepository.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      }

      const existingEmail = await userRepository.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      await userRepository.createUser(username, hashedPassword, email);
      res.json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar un usuario
  async updateUser(req, res) {
    const userId = req.params.id;
    const { username, password, email } = req.body;
    try {
      // Validar si el usuario existe
      const existingUser = await userRepository.getUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Hash de la nueva contraseña si se proporciona
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Actualizar el usuario
      await userRepository.updateUser(userId, username, hashedPassword, email);
      res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un usuario
  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      // Validar si el usuario existe
      const existingUser = await userRepository.getUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Eliminar el usuario
      await userRepository.deleteUser(userId);
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Login de usuario
  async loginUser(req, res) {
    const { username, password } = req.body;
    console.log('aqui estoy')
    try {
      const user = await userRepository.getUserByUsername(username);
        console.log('user in controller', user)
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Crear token JWT
      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

      res.status(200).json({
        success: true,
        data: username,
        token: token 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Logout de usuario (puede no ser necesario ya que JWT no almacena estado en el servidor)
  logoutUser(req, res) {
    // Puedes realizar alguna lógica de logout si es necesario
    res.json({ message: 'Logout exitoso' });
  }
}

module.exports = new UserController();
