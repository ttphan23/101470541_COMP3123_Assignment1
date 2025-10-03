const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use('/api/v1/user', require('./userRoutes'));
app.use('/api/v1/emp', require('./employeeRoutes'));

app.use((req,res)=> res.status(404).json({ status:false, message:"Route not found" }));

app.use((err,req,res,next) => {
  console.error(err);
  res.status(500).send("Server Error");
});

app.listen(process.env.PORT || 3000, ()=> console.log("🚀 Server running"));
