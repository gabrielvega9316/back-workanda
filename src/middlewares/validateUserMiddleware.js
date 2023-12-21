function validateUser(req, res, next) {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }
  
    next();
}

function validateUpdateUser(req, res, next){
  const { username, email } = req.body;
  
    if (!username || !email ) {
      return res.status(400).json({ error: 'Username and email  are required.' });
    }
  
    next();
}
  
module.exports = {validateUser , validateUpdateUser};