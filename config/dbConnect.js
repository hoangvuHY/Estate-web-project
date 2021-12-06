var connectDB = () => {
  const mongoose = require("mongoose");

  // tinhs sau
  let URL = process.env.DB_CLOUD;

  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Kết nối db thành công");
  });

  return mongoose;
};
module.exports = connectDB;
