const express = require('express');
const bodyParser = require('body-parser');
const connectMongoDB = require('./connectMongoDB');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectMongoDB()
  .then(db => {
    console.log('Connected to MongoDB successfully');
    
    // Routes
    const productsRouter = require('./routes/products')(db);
    app.use('/api/products', productsRouter);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
