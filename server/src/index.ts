import './config';
import express from 'express';
import cors from 'cors';
import AuthRoute from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoute);

const PORT = process.env.VITE_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});