import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DB: {
    MONGO_URI: process.env.MONGO_URI,
    Mongo_DBName: process.env.DB_NAME,
  },
  CORS: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
