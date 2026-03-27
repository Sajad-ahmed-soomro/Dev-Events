import mongoose from 'mongoose';

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  
  // Return existing connection if available
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    console.log('Creating new connection...');
    
    // Validate MongoDB URI exists
    if (!MONGODB_URI) {
      console.error('MONGODB_URI is not defined!');
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    
    const options = {
      bufferCommands: false, // Disable Mongoose buffering
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
    };

    
    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
      
      return mongoose;
    }).catch((error) => {
      console.error('Error message:', error.message);
      if (error.name === 'MongoServerError') {
        console.error('Error code:', error.code);
        console.error('Error codeName:', error.codeName);
      }
      throw error;
    });
  } else {
    console.log('Using existing connection promise');
  }

  try {
    // Wait for the connection to establish
    cached.conn = await cached.promise;
    console.log('Connection established successfully!');
  } catch (error) {
    // Reset promise on error to allow retry
    console.error('Failed to establish connection:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;