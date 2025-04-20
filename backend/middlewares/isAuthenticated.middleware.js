import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "USER NOT AUTHENTICATED",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    // const decode = await jwt.verify(token, "secrete_key");
    if (!decode) {
      return res.status(401).json({
        message: "INVALID TOKEN",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error, "AUTHENTICATION");
  }
};

export default isAuthenticated;
