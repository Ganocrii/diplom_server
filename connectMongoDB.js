const { MongoClient } = require('mongodb');

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    return client.db(); // Возвращаем экземпляр базы данных
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectMongoDB;
