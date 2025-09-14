import express, { NextFunction, Request, Response } from "express";
import { userRoute } from "./routes/userRoute";
import cors from "cors";
import { PORT } from "./config/config";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Student Records System API",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      notes: "/api/blood",
    },
    features: {
      authentication: "Register and login with JWT",
      blood:
        "Create, read, update, delete blood bank (requires authentication & admin role)",
    },
    testing: "Use Postman to test the API endpoints",
  });
});

app.use("/api/auth", userRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    error: "The requested endpoint does not exist",
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.listen(PORT, () => {
  console.log(`🚀server is running on http://localhost:${PORT}`);
});
