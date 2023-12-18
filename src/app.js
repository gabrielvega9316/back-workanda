const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../config/dbConfig'); 
const UserRepository = require('./repositories/userRepository');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const userRepository = new UserRepository(db);

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

