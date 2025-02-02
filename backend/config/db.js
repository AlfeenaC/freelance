const mongoose = require('mongoose');

// Handle deprecation warnings
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    // Make sure your MONGODB_URI starts with mongodb:// or mongodb+srv://
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI format');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (err.name === 'MongoServerSelectionError') {
      console.error('Please check if MongoDB is running and credentials are correct');
    }
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
