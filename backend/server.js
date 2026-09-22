const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

console.log("JWT =", process.env.JWT_SECRET_KEY);
require("dotenv").config({
  path: path.join(__dirname, "/.env"),
});

console.log("JWT =", process.env.JWT_SECRET_KEY);
require("dotenv").config({ path: "/.env" });

console.log(process.env.JWT_SECRET_KEY);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoutes = require("./routes/authroutes");
const productRoutes = require("./routes/productRoutes");
const categoryyy = require("./routes/categoryyy");
const CartRoutes = require("./routes/CartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const sellRoutes= require("./routes/sellRoutes");
const subscriberRoutes= require("./routes/subscriberRoutes");
const AdminRoutes = require('./routes/adminroute');
const notificationRoute = require('./routes/notificationRoutes');
const app = express();




app.use(cors());

app.use(express.json());
// Local /uploads static serving removed — product images are now hosted
// on Cloudinary (Render's disk is ephemeral, so local files don't survive
// restarts/redeploys). Old products saved before this change will still
// have /uploads/... paths in the DB and won't resolve; re-upload their
// images to get a Cloudinary URL.





app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryyy);
app.use("/api", CartRoutes);
app.use("/api", addressRoutes);
app.use("/api", sellRoutes);
app.use("/api", subscriberRoutes);
app.use('/api',AdminRoutes)
app.use('/api',notificationRoute)





mongoose.connect(
  "mongodb+srv://kajalmishra1932_db_user:mobiplanet@mobiplanet.hqcnarq.mongodb.net/mobiplanet?retryWrites=true&w=majority&appName=MobiPlanet"
)  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000"); 
});
