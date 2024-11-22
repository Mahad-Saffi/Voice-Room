import express from 'express';
import cors from 'cors';
import AuthRoute from './routes/auth';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoute);
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});