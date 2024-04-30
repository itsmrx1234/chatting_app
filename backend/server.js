import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectTOMONGO from '../db/connectTOMONGO.js';


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();
app.use(cookieparser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)
app.use(express.json);

app.get('/', (req, res) => {
    res.send("hello word");
});

app.listen(PORT, () => {
    connectTOMONGO();
    console.log(`Server is running on port ${PORT}`);
});
