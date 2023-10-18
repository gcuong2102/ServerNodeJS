// app.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const relationshipRoutes = require('./routes/relationshipRoutes')
const app = express();
mongoose.connect('mongodb://zanlyAdmin:Cuong0777234510!%40@103.118.29.91:27017/ZanlyDb?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/relationship', relationshipRoutes)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});