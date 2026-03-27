// test-mongo.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sajadahmedsoomro321:sajadSoomro123@cluster0.ns80uda.mongodb.net/events";

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    // List databases
    const databases = await client.db().admin().listDatabases();
    console.log('Databases:', databases.databases.map(db => db.name));
    
    // Check events collection
    const db = client.db('events');
    const collections = await db.listCollections().toArray();
    console.log('Collections in events db:', collections.map(c => c.name));
    
    // Try to find events
    const events = await db.collection('events').find().limit(5).toArray();
    console.log(`Found ${events.length} events`);
    
    await client.close();
    console.log('✅ Test completed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.message.includes('bad auth')) {
      console.error('❌ Authentication failed - check username and password');
    }
  }
}

testConnection();