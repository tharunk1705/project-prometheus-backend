require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routers
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const resourceRoutes = require("./routes/resource");

const app = express();

mongoose.connect( process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("Unable to Connect to DB");
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", resourceRoutes);

const port  = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`App is running at ${port}`);
});
