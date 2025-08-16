
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import routes from './routes/index.js';


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const origins=process.env.CORS_ORIGIN?.split(',').map(o=>o.trim());

// Connect to MongoDB
connectDB();

// Middleware
//app.use(cors());
app.use(cors({origin:origins,credentials:true}));
app.use(express.json());

// Routes

app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));