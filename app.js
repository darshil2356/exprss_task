const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./db/DB");
const userRouter = require("./routes/user_route");
const contactRouter = require("./routes/contect_route");
const errorHandler = require("./middleware/errorHandler");

connectDB();
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
