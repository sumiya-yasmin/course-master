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
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    SECURE: process.env.SMTP_SECURE === "true",
    FROM: process.env.SMTP_FROM,
  },
};

export default config;
