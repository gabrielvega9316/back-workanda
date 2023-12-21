
const pool = require('../../config/dbConfig')

class UserRepository {
    constructor(db) {
      pool.db = db;
    }
  
    async getAllUsers() {
        try {
          const [rows, fields] = await pool.db.promise().query('SELECT id, username, email FROM users');
          return rows;
        } catch (error) {
          throw error;
        }
      }
  
      async getUserById(userId) {
        try {
            const [result] = await pool.promise().query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
            return result;
          } catch (error) {
            throw error;
          }
    }
  
    async createUser(username, hashedPassword, email) {
        try {
          const [result] = await pool.promise().query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
          return result;
        } catch (error) {
          throw error;
        }
      }
  
    async updateUser(userId, username, email) {
      try {
          const [result] = await pool.promise().query('UPDATE users SET username = ? , email = ? WHERE id = ?', [username , email, userId]);
          return result;
        } catch (error) {
          throw error;
        }
    }
  
    async deleteUser(userId) {
      try {
        const [result] = await pool.promise().query('DELETE FROM users WHERE id = ?', [userId]);
        return result;
      } catch (error) {
        throw error;
      }
    }
  
    async getUserByUsername(username) {
        try {
            const [rows, fields] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0]; 
          } catch (error) {
            throw error;
          }
    }
   
    async getUserByEmail(email) {
        console.log('⚠️ email in repository', email)
        try {
            const [rows, fields] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0]; 
          } catch (error) {
            throw error;
          }
    }
  }
  
  module.exports = UserRepository;
  