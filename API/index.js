  import express from "express";
  import dotenv from "dotenv";
  import cookieParser from "cookie-parser";

  // Database connection
  import createConnection from "./DB/connect.js";

  // Error handler middleware
  import { errorHandler } from "./middleware/errorHandeler.js";

  // Routes imports
  import authRouter from "./routes/auth.route.js";
  import userRouter from "./routes/user.route.js";
  import officerRoutes from "./routes/officerRoutes.js";

  dotenv.config();

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware to parse JSON and cookies
  app.use(express.json());
  app.use(cookieParser());

  // Define API routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  // app.use("/api/officer", officerRoutes);
  app.use("/api/v1/officer", officerRoutes);
  // app.use("/api/institute", instituteRoutes);

  // Error handler (should be placed last)
  app.use(errorHandler);

  // Connect to MongoDB and start the server
  createConnection(process.env.MONGO_URI || "mongodb+srv://admin2:admin123@cluster0.y0uqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error(
        "Failed to start the server due to MongoDB connection error:",
        error
      );
      process.exit(1);
    });
