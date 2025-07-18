import { v2 as cloudinary } from "cloudinary";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been upload successfully
    console.log("file is upload on cloudinary", response.url);
    fs.unlinkSync(localFilePath); // remove the file after upload
    
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the file
    return null;
  }
};

export { uploadOnCloudinary };
