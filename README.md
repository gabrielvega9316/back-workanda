# Test - Workanda

Node.js v20.10.0 and Express are used for server logic, MySQL as the database, and JSON Web Tokens (JWT) for authentication.

## Directory Structure

```bash
project/
|-- src/
|   |-- controllers/
|   |-- middlewares/
|   |-- repositories/
|   |-- routes/
|   |-- app.js
|
|-- config/
|   |-- dbConfig.js
|   |-- jwtConfig.js
|
|-- node_modules/
|-- package.json
|-- .gitignore
|-- README.md

```

## Configuration and start

1. Install dependencies ```npm install```.
2. Create a database (instructions below).
3. Configure ````.env ```` following the ```example.env``` file.
4. run project ``` npm start ```. The application will be available on the port indicated in the environment or by default on port: 3000.

### Database Configuration:

- Run the SQL script on your MySQL server to create the database. The default user will also be created 
user : admin@owner.com
pass : 123456

``` bash
CREATE DATABASE IF NOT EXISTS workanda;

USE workanda;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@mail.com', '$2a$12$BByaQLMIUtYW37Vr8VgjS.Jqx2Ff73UJLAGCvsYmwhvTEYNC4ykf6');

```

## Api Documentation
Link to api documentation  [Api Documentation](https://documenter.getpostman.com/view/21346203/2s9Ykq7LcD#120b4e81-3e1b-4995-932f-77febf8f9e46)
