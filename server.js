const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

//All the routes for API Endpoints
const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const emailRoutes = require('./routes/emailRoutes')
const unsubscribeRoutes = require('./routes/unsubscribeRoutes')
const getUsers = require('./routes/getUserRoute')


app.use("/lists", listRoutes);
app.use("/users", userRoutes);
app.use("/email", emailRoutes);
app.use("/unsubscribe", unsubscribeRoutes);
app.use("/getUsers", getUsers);


app.get("/", (req,res)=>{
  res.send("Hello MathonGo Team, This is my assignment for backend developer Intern. Thanks for considering")
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
