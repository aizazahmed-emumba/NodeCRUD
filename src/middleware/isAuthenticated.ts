import {RequestUser} from "../types/User";
declare global {
  namespace Express {
    interface Request {
      user: RequestUser;
    }
  }
}
import jwt from "jsonwebtoken";
import {Request , Response , NextFunction} from "express";
import RefreshTokenDecoded from "../types/RefreshToken";

const auth = async (req:Request, res: Response, next : NextFunction ) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    res.status(403);
    next(new Error("Access denied"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY) as RefreshTokenDecoded;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403);
    if (err.name === "TokenExpiredError") {
      next(new Error("Token expired"));
    }
    next(new Error("Acess denied"));
  }
};

export default auth;
