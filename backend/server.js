const express = require("express");
const app = express();
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js")
const postsRoute = require("./routes/posts.js")
const uploadRoute = require("./routes/upload.js")
const PORT = 3002;
const mongoose = require("mongoose");
const path =  require("path");
require("dotenv").config();

//mongoDBでデータ接続
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DBと接続中..."))
  .catch((err) => console.log(err));


//ミドルウェア
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/upload", uploadRoute);


app.listen(PORT, () => console.log("サーバーが起動しましました"));