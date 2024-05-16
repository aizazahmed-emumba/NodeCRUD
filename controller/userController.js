import { User } from "../model/User.js";
import redisClient from "../config/redisClient.js";
import { addToCache, getFromCache } from "../utils/cache.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req, res, next) => {
  const user = req.body;

  const newUser = new User(user);

  try {
    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    let err;
    if (error.code === 11000) {
      res.statusCode = 400;
      err = new Error("User with this email already exists");
      next(err);
    } else {
      err = new Error("Internal Server Error");
    }
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    const error = new Error("User ID is required");
    next(error);
  }

  try {
    const user = await getFromCache(id);
    if (user) {
      return res.send(JSON.parse(user));
    }
  } catch (error) {
    console.log("Error getting user from Redis: ", error);
  }

  try {
    const user = await User.findById(id);
    if (user) {
      addToCache(id, JSON.stringify(user));
      return res.send(user);
    } else {
      res.status(404);
      const error = new Error("User not found");
      next(error);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const user = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404);
      const error = new Error("User not found");
      next(error);
    }
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(400);
      const error = new Error("User with this email already exists");
      next(error);
    }
    res.status(500);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404);
      const error = new Error("User not found");
      next(error);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    next(err);
  }
};
