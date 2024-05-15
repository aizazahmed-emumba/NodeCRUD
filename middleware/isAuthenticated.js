import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    res.status(403);
    next(new Error("Access denied"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
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
