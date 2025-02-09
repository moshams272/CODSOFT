import User from "../models/user.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { appError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT.js";
import { validationResult } from "express-validator";

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return next(
      appError.create("User already exists", 400, httpStatusText.FAIL)
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    tasks: [],
    manage: [],
  });
  newUser.token = await generateJWT({ email: newUser.email, _id: newUser._id });
  await newUser.save();
  res
    .status(201)
    .json({
      status: httpStatusText.SUCCESS,
      data: {
        user: {_id:newUser._id, firstName:newUser.firstName, lastName:newUser.lastName, email:newUser.email,token:newUser.token},
      },
    });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      appError.create(
        "email and password are required",
        400,
        httpStatusText.FAIL
      )
    );
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(appError.create("User not found", 400, httpStatusText.FAIL));
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return next(appError.create("Something wrong", 500, httpStatusText.ERROR));
  }
  const token = await generateJWT({ email: user.email, _id: user._id });
  return res.json({ status: httpStatusText.SUCCESS, data: { token: token } });
});

const getCurrentUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.currentUser._id);
  
  if (!user) {
    return next(appError.create("User not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { user: {_id:user._id, firstName:user.firstName, lastName:user.lastName, email:user.email} } });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(appError.create(error.array(), 400, httpStatusText.FAIL));
  }
  const user = await User.findByIdAndUpdate(req.currentUser._id, {
    $set: { ...req.body },
  });
  if (!user) {
    return next(appError.create("User not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.currentUser._id);
  console.log(user);
  
  if (user.tasks.length!==0 || user.manage.length!==0) {
    return next(
      appError.create(
        "should completed all tasks and projects",
        400,
        httpStatusText.FAIL
      )
    );
  }
  await User.deleteOne({ _id: req.currentUser._id });
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

export { register, login, getCurrentUser, updateUser, deleteUser };
