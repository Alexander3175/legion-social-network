import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import user from './models/test.js';

const app = express();

dotenv.config();

const corsOption = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/users", async (req, res) => {
   try {
       const users = await user.find();
       res.json(users);
   } catch (err) {
       res.status(500).json({ error: err.message });
   }
});
app.post("/api/users", async (req, res) => {
    const {name, password} = req.body;
    const newUser = new user({name, password})
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 });
const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
        app.listen(process.env.SERVER_PORT, () => {
            console.log("Server Started on port 8080");
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

startApp();
