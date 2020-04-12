import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_PROD_URL || process.env.MONGO_DB_DEV_URL;

const options = {
  dbName: 'KickShoppe',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, options);
    console.log(`✅ MongoDB is connected`);
  } catch (error) {
    console.log(`❌ Not Connected to MongoDB' + ${error}`);
  }
};

export default mongoDBConnect;
