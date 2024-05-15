import UserToken from "../model/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    const token = await UserToken.findOne({ token: refreshToken });
    if (!token) {
      return { error: true, message: "Invalid refresh token" };
    }

    const tokenDetails = jwt.verify(refreshToken, privateKey);
    if (!tokenDetails) {
      return { error: true, message: "Invalid refresh token" };
    }
    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message };
  }
};
export default verifyRefreshToken;
