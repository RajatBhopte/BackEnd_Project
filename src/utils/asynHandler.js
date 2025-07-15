import e from "express";

const asyncHandler = (requestHandle)=>{
    (req , res , next)=>{
    Promise.resolve(requestHandle(req, res, next)).catch((err) => next(err));
    }
}


export default asyncHandler;
// const asyncHandler = (fun) => async(req , res , next) => {
//     try {

//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })

        
//     }

// };
