const mongoose = require("mongoose");
const dns = require("node:dns/promises");

require("dotenv").config();

exports.connect = async () => {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection issue:", error.message);
    process.exit(1);
  }
};
