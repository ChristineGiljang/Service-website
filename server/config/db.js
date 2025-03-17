const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // ⏳ 30 seconds for server selection
      socketTimeoutMS: 45000, // ⏳ 45 seconds for socket timeout
      connectTimeoutMS: 30000, 
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
