const express = require('express');
const app = express();
const PORT = 3000;
const { dbConnection } = require('./config/config');
const tasksRoutes = require('./routes/tasks');

app.use(express.json());

tasksRoutes.tasksRoutes(app);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));