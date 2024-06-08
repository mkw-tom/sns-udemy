const express = require("express");
const app = express();
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js")
const postsRoute = require("./routes/posts.js")
const uploadRoute = require("./routes/upload.js")
const PORT = 3002;
const mongoose = require("mongoose");
const path =  require("path");
const cors = require("cors")

require("dotenv").config();

//mongoDBでデータ接続
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DBと接続中..."))
  .catch((err) => console.log(err));

// const corsOption = {
//   origin: "https://sns-udemy-six.vercel.app",
//   methods: "GET, PUT, PATCH, POST, DELETE",
//   crendentials: true,
//   optionSuccessStatus: 204,
// }

//ミドルウェア
// app.use(cors(corsOption));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/api/users", cors(), userRoute);
app.use("/api/auth", cors(), authRoute);
app.use("/api/posts", cors(), postsRoute);
app.use("/api/upload", cors(), uploadRoute);


app.listen(PORT, () => console.log("サーバーが起動しましました"));