const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

// Строка подключения к MongoDB
const mongoURI = `${process.env.MONGODB_URI}?retryWrites=true&w=majority&connectTimeoutMS=10000&socketTimeoutMS=45000`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected successfully to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
