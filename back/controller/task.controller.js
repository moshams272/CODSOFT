import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { appError } from "../utils/AppError.js";
import cron from "node-cron"

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params._id).populate({path:"project",populate:({path:"manager",select:"email"})}).populate("assignedTo","email");
  if (!task) {
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { task: task } });
});

const updateTaskStatusForUser = asyncWrapper(async (req, res, next) => {
  if (!["Not Started", "In Progress", "Completed"].includes(req.body.status)) {
    return next(appError.create("Try again", 400, httpStatusText.FAIL));
  }
  const taskTest = await Task.findById(req.params._id);
  if(taskTest.status==="Deadline is over"){
    return next(appError.create("Sorry Deadline is over", 400, httpStatusText.FAIL));
  }
  const task = await Task.findByIdAndUpdate(req.params._id, {
    $set: { status: req.body.status },
  });
  if (!task) {
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const getAllTasksForUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.currentUser._id).populate({path:"tasks",populate:{path:"project"}});
  if (!user) {
    return next(appError.create("User not found", 400, httpStatusText.FAIL));
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { tasks: user.tasks },
  });
});

const updateTaskForManager = asyncWrapper(async (req, res, next) => {
  if(req.body.deadline<new Date().toISOString()){
    return next(appError.create("The Date should be in future", 400, httpStatusText.FAIL));
  }
  const task = await Task.findByIdAndUpdate(req.params._id, {
    $set: { ...req.body },
  });
  if (!task) {
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const assignTask=asyncWrapper(async(req,res,next)=>{
  const {email} =req.body;
  if(!email){
    return next(appError.create("Email is required", 400, httpStatusText.FAIL));
  }
  const user = await User.findOne({email:email});
  if(!user){
    return next(appError.create("User not found, Check the email again", 400, httpStatusText.FAIL));
  }
  if(user.tasks.includes(req.params._id)){
    return next(appError.create("User is already assign to that task", 400, httpStatusText.FAIL));
  }
  await User.findOneAndUpdate({email:email},{$push:{tasks:req.params._id}});
  const task = await Task.findByIdAndUpdate(req.params._id, {
    $push:{assignedTo:user._id}
  });
  if(!task){
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const unassignTask=asyncWrapper(async(req,res,next)=>{
  const {email} =req.body;
  if(!email){
    return next(appError.create("Email is required", 400, httpStatusText.FAIL));
  }
  const user = await User.findOne({email:email});
  if(!user){
    return next(appError.create("User not found, Check the email again", 400, httpStatusText.FAIL));
  }
  if(!user.tasks.includes(req.params._id)){
    return next(appError.create("User isn't already assign to that task", 400, httpStatusText.FAIL));
  }
  await User.findOneAndUpdate({email:email},{$pull:{tasks:req.params._id}});
  const task = await Task.findByIdAndUpdate(req.params._id, {
    $pull:{assignedTo:user._id}
  });
  if(!task){
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  await User.updateMany({tasks:req.params._id},{$pull:{tasks:req.params._id}});
  const task = await Task.findByIdAndDelete(req.params._id);
  if (!task) {
    return next(appError.create("Task not found", 400, httpStatusText.FAIL));
  }
  await User.findByIdAndUpdate(req.currentUser._id,{$pull:{tasks:req.params._id}});
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { title, description, project, deadline } = req.body;
  if(deadline<new Date().toISOString()){
    return next(appError.create("The Date should be in future", 400, httpStatusText.FAIL));
  }
  const newTask = new Task({
    title,
    description,
    project,
    deadline,
    assignedTo: [],
    status: "Not Started",
  });
  await newTask.save();
  await User.findByIdAndUpdate(req.currentUser._id,{$push:{tasks:req.params._id}});
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: newTask });
});

const getAllTasksForProject = asyncWrapper(async (req, res, next) => {
  const tasks = (await Task.find({ project: req.params._id })) || [];
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks: tasks } });
});

export {
  getTask,
  updateTaskStatusForUser,
  getAllTasksForUser,
  updateTaskForManager,
  deleteTask,
  createTask,
  getAllTasksForProject,
  assignTask,
  unassignTask
};

async function updateEveryMidNightTasks() {
  await Task.updateMany(
    { deadline: { $lt: new Date() } },
    { $set: { status: "Deadline is over" } }
  );
}

cron.schedule("0 0 * * *",updateEveryMidNightTasks);