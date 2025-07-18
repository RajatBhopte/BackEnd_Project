import { asyncHandler } from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = asyncHandler(async (req, res) => {
  // *********step for user register**********
  // get user detail from frontend
  // validate user data
  // check if user already exists : username , email
  // check for images , check for avatar
  // upload them to cloudinary , avatar
  // create user object - create entry in db
  // remove password and refresh token from response
  // check for user creation
  // return response

  const { fullname, email, username, password } = req.body;
  console.log("email", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrors(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiErrors(409, "User already exists with this username or email");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if(!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar is required");
  }

  const avatar  =  await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiErrors(500, "Avatar upload failed");
  }

  const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage: coverImage?.url ||  "",
    email,
    password,
    username: username.toLowerCase(),

  }
  )
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiErrors(500, "Something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );


});

export { registerUser };
