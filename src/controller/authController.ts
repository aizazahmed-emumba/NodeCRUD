import { User } from "../model/User";
import UserToken from "../model/UserToken";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import jwt from "jsonwebtoken";
import {Request , Response , NextFunction} from "express";

export const login = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401);
      next(new Error("Invalid email or password"));
    }

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      res.status(401);
      next(new Error("Invalid email or password"));
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    next(new Error("Internal server error"));
  }
};

export const refreshToken = async (req:Request, res: Response, next : NextFunction ) => {
  const result = await verifyRefreshToken(req.body.refreshToken);

  const { tokenDetails, message, error } = result;

  if (error) {
    res.status(401);
    next(new Error(message));
    return;
  }
  
  if (tokenDetails) {
    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "20m" }
    );
    return res.status(200).json({
      accessToken,
      message: "Access token created successfully",
    });
  }

  res.status(401);
  next(new Error("Internal Server Error"));
  return;
};

export const logout = async (req:Request, res: Response) => {
  try {
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await UserToken.findByIdAndDelete(userToken._id);
    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
