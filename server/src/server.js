import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import config from './config/envConfig.js';


const app = express();
connectDB();
app.use(express.json());
app.use(cors(config.CORS));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));