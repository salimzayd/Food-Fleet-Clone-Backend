import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userrouter from "./routes/userRoute.js";
import adminroute from "./routes/adminRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_DB;

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Foodfleet Project',
      version: '1.0.0',
      description: 'API documentation for Foodfleet project',
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
      },
    ],
    tags: [
      {
        name: 'User API',
        description: 'API endpoints for users',
      },
      {
        name: 'Admin API',
        description: 'API endpoints for Admin',
      },
    ],
  },
  apis: ['./routes/userRoute.js','./routes/adminRoute.js'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

// Connect to MongoDB
async function main() {
  await mongoose.connect(mongodb);
  console.log("DB connected");
}
main().catch((err) => {
  console.error(err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "https://food-fleet-clone-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Food Fleet...');
});

// Swagger UI setup
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/users', userrouter);
app.use('/api/admin', adminroute);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
