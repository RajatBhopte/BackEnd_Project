
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    
})
.catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});
