import express  from 'express';
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from './routes/post.js';
import authRoutes from "./routes/auth.js";
import readRoutes from "./routes/read.js";
// import single from "./routes/single.js"

import multer from "multer";



dotenv.config();
const app = express();

app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true 
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/post", postRoutes);
app.use('/auth',authRoutes);
app.use('/fetch',readRoutes);
// app.use('/single',single);

const port= process.env.PORT || 5000;
app.listen(port, () => console.log("Surver is running!"));