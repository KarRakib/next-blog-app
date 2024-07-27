import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URL;
const options = {
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
  throw new Error('Please add your Mongo URI to .env.NEXT_PUBLIC_local');
}

if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
